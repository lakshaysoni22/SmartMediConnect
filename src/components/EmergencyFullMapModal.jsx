import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, InfoWindowF, MarkerF } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, useSharedGoogleMapsLoader } from '../utils/googleMapsLoader';

export function EmergencyFullMapModal({ isOpen, onClose, initialLocation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState(initialLocation || { lat: 28.65905, lng: 77.33984 });
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [isHospitalLoading, setIsHospitalLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const canUseJsApi = GOOGLE_MAPS_API_KEY.startsWith('AIza');

  const { isLoaded, loadError } = useSharedGoogleMapsLoader();

  useEffect(() => {
    if (initialLocation) {
      setMapCenter(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchNearbyHospitals = async () => {
      setIsHospitalLoading(true);
      try {
        const overpassQuery = `
          [out:json][timeout:25];
          (
            node["amenity"="hospital"](around:10000,${mapCenter.lat},${mapCenter.lng});
            way["amenity"="hospital"](around:10000,${mapCenter.lat},${mapCenter.lng});
            relation["amenity"="hospital"](around:10000,${mapCenter.lat},${mapCenter.lng});
          );
          out center tags;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `data=${encodeURIComponent(overpassQuery)}`
        });
        if (!response.ok) throw new Error('Hospital fetch failed');

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
          .slice(0, 20);

        setNearbyHospitals(hospitals);
      } catch {
        setNearbyHospitals([]);
      } finally {
        setIsHospitalLoading(false);
      }
    };

    fetchNearbyHospitals();
  }, [isOpen, mapCenter]);

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    const isGenericHospitalSearch =
      query.toLowerCase() === 'hospital' ||
      query.toLowerCase() === 'hospitals' ||
      query.toLowerCase() === 'nearby hospital' ||
      query.toLowerCase() === 'nearby hospitals';

    if (isGenericHospitalSearch) {
      // Keep current detected/selected location as center and refresh nearby hospitals there.
      setSearchError('');
      setMapCenter((prev) => ({ ...prev }));
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Search failed');
      const results = await response.json();
      const first = results?.[0];
      if (!first) {
        setSearchError('Location not found.');
        return;
      }

      setMapCenter({
        lat: Number(first.lat),
        lng: Number(first.lon)
      });
    } catch {
      setSearchError('Unable to search location right now.');
    } finally {
      setIsSearching(false);
    }
  };

  const shouldUseEmbedFallback = !canUseJsApi || Boolean(loadError);
  const embedMapUrl = useMemo(
    () => `https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=14&output=embed`,
    [mapCenter]
  );
  const sourceLocation = initialLocation || mapCenter;

  const openDirectionsInGoogleMaps = (hospital) => {
    const placeQuery = `${hospital.name} near ${mapCenter.lat},${mapCenter.lng}`;
    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 md:p-6">
      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Emergency Map View</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Close full map view"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-4 md:px-6 py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search location (e.g., Vaishali)"
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors disabled:opacity-60"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
          {searchError ? <p className="mt-2 text-xs text-red-500">{searchError}</p> : null}
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3 min-h-0">
            {!shouldUseEmbedFallback && !isLoaded ? (
              <div className="h-full w-full flex items-center justify-center text-slate-600 dark:text-slate-300">Loading map...</div>
            ) : shouldUseEmbedFallback ? (
              <iframe
                title="Emergency full map"
                src={embedMapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={14}
                options={{ fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
              >
                <MarkerF position={mapCenter} title="Selected Location" />
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
                    <div className="text-sm font-semibold text-slate-900">{selectedHospital.name}</div>
                  </InfoWindowF>
                ) : null}
              </GoogleMap>
            )}
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 p-3 md:p-4 overflow-y-auto">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3">Nearby Hospitals (10 km)</p>
            {isHospitalLoading ? (
              <p className="text-xs text-slate-500">Finding nearby hospitals...</p>
            ) : nearbyHospitals.length === 0 ? (
              <p className="text-xs text-slate-500">No nearby hospitals found for this area.</p>
            ) : (
              <div className="space-y-2">
                {nearbyHospitals.map((hospital) => (
                  <button
                    key={hospital.id}
                    onClick={() => {
                      openDirectionsInGoogleMaps(hospital);
                    }}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">{hospital.name}</p>
                    <p className="text-[11px] text-slate-500">Tap to open Google Maps directions</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
