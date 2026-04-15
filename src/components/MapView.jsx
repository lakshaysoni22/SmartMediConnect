import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, useSharedGoogleMapsLoader } from '../utils/googleMapsLoader';

export function MapView({ onNavigate }) {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.006 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [hospitalError, setHospitalError] = useState('');
  const [isHospitalLoading, setIsHospitalLoading] = useState(false);
  const [routeInfoByHospital, setRouteInfoByHospital] = useState({});
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const canUseJsApi = GOOGLE_MAPS_API_KEY.startsWith('AIza');

  const { isLoaded, loadError } = useSharedGoogleMapsLoader();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        // Keep fallback location if user denies permission.
      }
    );
  }, []);

  const shouldUseEmbedFallback = !canUseJsApi || Boolean(loadError);
  const mapCenter = searchedLocation || userLocation;
  const embedMapUrl = useMemo(() => {
    const { lat, lng } = mapCenter;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  }, [mapCenter]);

  const handleLocationSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    setSearchError('');

    try {
      const coordinateMatch = query.match(
        /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/
      );
      let firstResult = null;

      if (coordinateMatch) {
        firstResult = {
          lat: Number(coordinateMatch[1]),
          lon: Number(coordinateMatch[2]),
          display_name: 'Selected coordinates'
        };
      } else {
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(query)}`
        );

        if (!nominatimResponse.ok) {
          throw new Error('Search request failed.');
        }

        const nominatimResults = await nominatimResponse.json();
        firstResult = nominatimResults?.[0] || null;
      }

      if (!firstResult) {
        setSearchError('Location not found. Please try another search.');
        return;
      }

      const nextLocation = {
        lat: Number(firstResult.lat),
        lng: Number(firstResult.lon),
        name: firstResult.display_name
      };

      setSearchedLocation(nextLocation);
    } catch {
      setSearchError('Unable to search location right now.');
    } finally {
      setIsSearching(false);
    }
  };

  const getHaversineDistanceKm = (origin, destination) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const earthRadiusKm = 6371;
    const latDiff = toRad(destination.lat - origin.lat);
    const lonDiff = toRad(destination.lng - origin.lng);
    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(toRad(origin.lat)) *
        Math.cos(toRad(destination.lat)) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      setIsHospitalLoading(true);
      setHospitalError('');

      try {
        const overpassQuery = `
          [out:json][timeout:25];
          (
            node["amenity"="hospital"](around:1500,${mapCenter.lat},${mapCenter.lng});
            way["amenity"="hospital"](around:1500,${mapCenter.lat},${mapCenter.lng});
            relation["amenity"="hospital"](around:1500,${mapCenter.lat},${mapCenter.lng});
          );
          out center tags;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
          throw new Error('Hospital API failed');
        }

        const data = await response.json();
        const hospitals = (data?.elements || [])
          .map((item) => {
            const lat = item?.lat ?? item?.center?.lat;
            const lng = item?.lon ?? item?.center?.lon;
            if (typeof lat !== 'number' || typeof lng !== 'number') return null;
            return {
              id: `${item.type}-${item.id}`,
              name: item?.tags?.name || 'Nearby Hospital',
              lat,
              lng
            };
          })
          .filter(Boolean)
          .slice(0, 12);

        setNearbyHospitals(hospitals);
      } catch {
        setNearbyHospitals([]);
        setHospitalError('Nearby hospitals fetch failed. Please try another location.');
      } finally {
        setIsHospitalLoading(false);
      }
    };

    fetchNearbyHospitals();
  }, [mapCenter]);

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!nearbyHospitals.length) {
        setRouteInfoByHospital({});
        return;
      }

      setIsRouteLoading(true);
      const nextRouteInfo = {};

      await Promise.all(
        nearbyHospitals.map(async (hospital) => {
          try {
            const routeResponse = await fetch(
              `https://router.project-osrm.org/route/v1/driving/${mapCenter.lng},${mapCenter.lat};${hospital.lng},${hospital.lat}?overview=false`
            );

            if (!routeResponse.ok) {
              throw new Error('Route API failed');
            }

            const routeData = await routeResponse.json();
            const route = routeData?.routes?.[0];
            if (!route) {
              throw new Error('No route found');
            }

            nextRouteInfo[hospital.id] = {
              distanceKm: route.distance / 1000,
              durationMin: route.duration / 60
            };
          } catch {
            // Safe fallback when route API is unavailable
            const distanceKm = getHaversineDistanceKm(mapCenter, {
              lat: hospital.lat,
              lng: hospital.lng
            });
            const estimatedDurationMin = (distanceKm / 35) * 60;
            nextRouteInfo[hospital.id] = {
              distanceKm,
              durationMin: estimatedDurationMin
            };
          }
        })
      );

      setRouteInfoByHospital(nextRouteInfo);
      setIsRouteLoading(false);
    };

    fetchRoutes();
  }, [mapCenter, nearbyHospitals]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-black h-full overflow-hidden">
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => onNavigate?.('finddoctor')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>
          <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Nearby Hospitals</h2>
          <div className="w-[72px]" />
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-hidden">
        <div className="max-w-[1200px] mx-auto h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col">
          <div className="p-3 md:p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                placeholder="Search location..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                onClick={handleLocationSearch}
                disabled={isSearching}
                className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
            {searchError ? (
              <p className="mt-2 text-xs font-medium text-red-500">{searchError}</p>
            ) : null}
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold">Nearby hospital routes:</span>
              {isHospitalLoading || isRouteLoading ? (
                <span>Calculating...</span>
              ) : hospitalError ? (
                <span className="text-red-500">{hospitalError}</span>
              ) : nearbyHospitals.length === 0 ? (
                <span>No hospitals found within 1.5 km.</span>
              ) : (
                nearbyHospitals.map((hospital) => {
                  const route = routeInfoByHospital[hospital.id];
                  if (!route) return null;
                  return (
                    <span
                      key={hospital.id}
                      className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      {hospital.name}: {route.distanceKm.toFixed(1)} km, {Math.round(route.durationMin)} mins
                    </span>
                  );
                })
              )}
            </div>
          </div>
          <div className="flex-1 min-h-0">
          {!shouldUseEmbedFallback && !isLoaded ? (
            <div className="h-full w-full flex items-center justify-center text-slate-600 dark:text-slate-300">
              Loading map...
            </div>
          ) : shouldUseEmbedFallback ? (
            <iframe
              title="Nearby hospitals map"
              src={embedMapUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={13}
              options={{ fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
            >
              <MarkerF position={userLocation} title="Your Location" />
              {searchedLocation ? (
                <MarkerF
                  position={{ lat: searchedLocation.lat, lng: searchedLocation.lng }}
                  onClick={() => setSelectedHospital({ ...searchedLocation, id: 'searched' })}
                />
              ) : null}
              {nearbyHospitals.map((hospital) => (
                <MarkerF
                  key={hospital.id}
                  position={{ lat: hospital.lat, lng: hospital.lng }}
                  onClick={() => setSelectedHospital(hospital)}
                />
              ))}

              {selectedHospital ? (
                <InfoWindowF
                  position={{ lat: selectedHospital.lat, lng: selectedHospital.lng }}
                  onCloseClick={() => setSelectedHospital(null)}
                >
                  <div className="text-sm text-slate-900">
                    <p className="font-semibold">{selectedHospital.name}</p>
                    {routeInfoByHospital[selectedHospital.id] ? (
                      <p className="text-xs mt-1 text-slate-600">
                        {routeInfoByHospital[selectedHospital.id].distanceKm.toFixed(1)} km,{' '}
                        {Math.round(routeInfoByHospital[selectedHospital.id].durationMin)} mins
                      </p>
                    ) : null}
                  </div>
                </InfoWindowF>
              ) : null}
            </GoogleMap>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
