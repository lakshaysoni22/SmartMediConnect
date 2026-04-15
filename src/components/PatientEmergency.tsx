import React, { useState, useEffect, useMemo } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { EmergencyCallModal } from './EmergencyCallModal';
import { EmergencyFullMapModal } from './EmergencyFullMapModal';
import { GOOGLE_MAPS_API_KEY, useSharedGoogleMapsLoader } from '../utils/googleMapsLoader';
import { logEmergencySosEvent } from '../lib/supabaseWrites';

/** Product graphic only (from HealthLite-style mock); displayed at fixed size in Smart Emergency Watch. */
const SMART_EMERGENCY_WATCH_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnEELe4KQEv2CMf9ecc4EoxLq8JrKL80ZpIm4DN3R9IqEKpsu2Rn2yGxaZAWiGEOtSFzkHZS5ZN-KRInEDQHdwmHqhxgGJn190RTVbH5nLWnrX59f8aLzugQPwziO-9_kl2MoYywylI3y05zg4o-1hoyw7annD2DSTLtnuj1eOPmeZnTTikPm876PLWmIHsvep-Q6HIZ_Tot59L4JV0VVFylALie9K6ZXpjsJU50GHWguAIbm6W6bB01xg7gg66ffj57Ay5qlPtjOX';

/** India emergency short codes — opens the device phone app (tel:). */
const EMERGENCY_ALL_IN_ONE = '112';
const EMERGENCY_AMBULANCE = '108';
const EMERGENCY_POLICE = '100';

function dialEmergencyNumber(number: string) {
  window.location.href = `tel:${number}`;
}

interface PatientEmergencyProps {
  onNavigate?: (page: string) => void;
}

export function PatientEmergency({ onNavigate }: PatientEmergencyProps) {
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [isWatchPanelExpanded, setIsWatchPanelExpanded] = useState(true);
  const [lastSyncedLabel, setLastSyncedLabel] = useState('Just now');
  const [autoSosTrigger, setAutoSosTrigger] = useState(true);
  const [emergencyLocationShare, setEmergencyLocationShare] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
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
        // Keep map fallback if geolocation fails.
      }
    );
  }, []);

  const handleSOSPress = () => {
    setLastSyncedLabel('Just now');
    dialEmergencyNumber(EMERGENCY_ALL_IN_ONE);
    void logEmergencySosEvent({
      number_dialed: EMERGENCY_ALL_IN_ONE,
      lat: userLocation?.lat ?? null,
      lng: userLocation?.lng ?? null,
      ts: new Date().toISOString()
    });
    setIsEmergencyModalOpen(true);
  };

  const emergencyCenter = userLocation || { lat: 47.6062, lng: -122.3321 };
  const shouldUseEmbedFallback = !canUseJsApi || Boolean(loadError);

  const embedMapUrl = useMemo(() => {
    return `https://maps.google.com/maps?q=${emergencyCenter.lat},${emergencyCenter.lng}&z=14&output=embed`;
  }, [emergencyCenter.lat, emergencyCenter.lng]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="emergency"
        title="Emergency Support"
        subtitle="24/7 emergency assistance and medical support services"
      />

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-6">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-white text-xs">info</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">Emergency Protocol Advice</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Pressing SOS will immediately alert dispatchers and share your real-time GPS location and Medical ID with first responders. Use only in critical situations.
              </p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Emergency Actions */}
            <div className="xl:col-span-2 flex min-w-0 flex-col gap-6">
              {/* SOS Button Card */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl p-8 lg:p-12 flex flex-col items-center justify-center relative overflow-hidden text-center">
                {/* Emergency Mode Badge */}
                <div className="absolute top-4 right-4 text-xs font-bold text-red-500 uppercase tracking-widest border border-red-300 dark:border-red-800 px-3 py-1 rounded-md bg-red-50 dark:bg-red-900/20">
                  Emergency Mode
                </div>
                
                <style>
                  {`
                    @keyframes pulse-red {
                      0% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                      }
                      70% {
                        transform: scale(1);
                        box-shadow: 0 0 0 25px rgba(239, 68, 68, 0);
                      }
                      100% {
                        transform: scale(0.95);
                        box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                      }
                    }
                  `}
                </style>

                {/* SOS Button */}
                <div className="relative z-10 mb-8">
                  <button 
                    onClick={handleSOSPress}
                    className="w-44 h-44 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex flex-col items-center justify-center transition-transform active:scale-95 group cursor-pointer shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      animation: 'pulse-red 2s infinite'
                    }}
                  >
                    <span className="material-symbols-outlined text-7xl mb-2 group-hover:scale-110 transition-transform drop-shadow-md" style={{ fontVariationSettings: '"FILL" 1' }}>
                      sos
                    </span>
                    <span className="text-xl font-black tracking-wider drop-shadow-sm">
                      PRESS
                    </span>
                  </button>
                </div>

                {/* Description */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Emergency Assistance</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm relative z-10">
                  <span className="font-bold text-red-600 dark:text-red-400">Hold for 3 seconds</span> to connect with the nearest dispatch center. Your medical profile will be transmitted automatically.
                </p>
              </div>

              {/* Emergency Service Buttons — tel: opens device dialer (108 / 100 / 112) */}
              <div className="grid grid-cols-4 gap-4">
                <a
                  href={`tel:${EMERGENCY_AMBULANCE}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group shadow-sm cursor-pointer no-underline text-inherit"
                  aria-label={`Call ambulance, ${EMERGENCY_AMBULANCE}`}
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <span className="material-symbols-outlined text-2xl">ambulance</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">Ambulance · {EMERGENCY_AMBULANCE}</span>
                </a>

                <a
                  href={`tel:${EMERGENCY_POLICE}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group shadow-sm cursor-pointer no-underline text-inherit"
                  aria-label={`Call police, ${EMERGENCY_POLICE}`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <span className="material-symbols-outlined text-2xl">local_police</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">Police · {EMERGENCY_POLICE}</span>
                </a>

                <a
                  href={`tel:${EMERGENCY_ALL_IN_ONE}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group shadow-sm cursor-pointer no-underline text-inherit"
                  aria-label={`Call unified emergency, ${EMERGENCY_ALL_IN_ONE}`}
                >
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                    <span className="material-symbols-outlined text-2xl">local_fire_department</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">Fire · {EMERGENCY_ALL_IN_ONE}</span>
                </a>

                <a
                  href={`tel:${EMERGENCY_ALL_IN_ONE}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group shadow-sm cursor-pointer no-underline text-inherit"
                  aria-label={`Call emergency helpline, ${EMERGENCY_ALL_IN_ONE}`}
                >
                  <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                    <span className="material-symbols-outlined text-2xl">medication</span>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-200 text-xs">Poison · {EMERGENCY_ALL_IN_ONE}</span>
                </a>
              </div>

              {/* GPS Location Map */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden flex flex-col relative">
                {/* GPS Status */}
                <div className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">GPS Signal Strong</span>
                </div>

                {/* Map Display */}
                <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative">
                  {!shouldUseEmbedFallback && !isLoaded ? (
                    <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                      Loading map...
                    </div>
                  ) : shouldUseEmbedFallback ? (
                    <iframe
                      title="Emergency location map"
                      src={embedMapUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={emergencyCenter}
                      zoom={14}
                      options={{ zoomControl: true, streetViewControl: false, mapTypeControl: false }}
                    >
                      {userLocation && <MarkerF position={userLocation} title="You are here" />}
                    </GoogleMap>
                  )}
                </div>

                {/* Location Footer */}
                <div className="bg-white dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined text-xl">pin_drop</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-0.5">Current Location</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {userLocation ? `${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}` : 'Detecting location...'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullMapOpen(true)}
                      className="text-xs font-bold bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      FULL MAP VIEW
                    </button>
                    <button className="text-xs font-bold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-200 dark:border-blue-800">
                      UPDATE
                    </button>
                  </div>
                </div>
              </div>

              {/* Smart Emergency Watch — below map (full width of main column) */}
              <div className="min-w-0 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">watch</span>
                    <h3 className="font-bold text-slate-900 dark:text-white">Smart Emergency Watch</h3>
                  </div>
                </div>

                {!isWatchPanelExpanded ? (
                  <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-slate-500 text-xl shrink-0">watch</span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">SmartMediConnect Pro v2</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Connected</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsWatchPanelExpanded(true)}
                      className="text-sm font-semibold text-[#2D54A8] dark:text-blue-400 hover:underline"
                    >
                      Manage
                    </button>
                  </div>
                ) : (
                  <div className="p-4 sm:p-5 min-w-0">
                    <div className="flex flex-col xl:flex-row gap-4 xl:gap-5 rounded-2xl border border-slate-200/80 dark:border-slate-600/80 bg-slate-50/80 dark:bg-slate-900/40 min-h-0 min-w-0 overflow-hidden">
                      <div className="flex w-full min-w-0 max-w-full shrink-0 flex-col items-center bg-slate-100 dark:bg-slate-800/80 px-4 py-6 sm:px-6 sm:py-7 xl:w-[300px] xl:max-w-[320px] xl:shrink-0 overflow-hidden mx-auto xl:mx-0">
                        <p className="mb-4 shrink-0 text-center text-[10px] font-black uppercase tracking-[0.18em] text-[#2D54A8] dark:text-blue-400">
                          SMARTMEDICONNECT
                        </p>

                        {/* Dialog-style frame: 240×220 image area */}
                        <div className="flex h-[220px] w-[240px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-900/95 dark:shadow-inner">
                          <img
                            src={SMART_EMERGENCY_WATCH_IMAGE}
                            alt="Smart emergency watch"
                            width={240}
                            height={220}
                            className="max-h-full max-w-full object-contain object-center"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>

                        <p className="mt-5 w-full max-w-[280px] px-2 text-center text-xs leading-relaxed text-slate-600 dark:text-slate-400 break-words">
                          Your watch is paired with SmartMediConnect. If you trigger SOS, we can send your live vitals and
                          current location to emergency services so they can respond more quickly. Keep the connection
                          active for the best protection.
                        </p>

                        <div className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                          </span>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Connected</span>
                        </div>
                      </div>

                      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5 bg-white dark:bg-slate-800 max-h-[min(72vh,640px)] xl:max-h-none">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="min-w-0">
                            <h4 className="text-lg font-bold text-[#1e3a5f] dark:text-white leading-tight">
                              SmartMediConnect Pro v2
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 break-words">
                              Last synced: {lastSyncedLabel}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                            <span className="material-symbols-outlined text-[16px]">battery_charging_full</span>
                            88%
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-3 shadow-sm min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                              <span className="material-symbols-outlined text-red-500 text-[18px]">favorite</span>
                              Heart rate
                            </div>
                            <p className="text-xl font-black text-slate-900 dark:text-white">
                              72 <span className="text-sm font-bold text-slate-500">BPM</span>
                            </p>
                          </div>
                          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-3 shadow-sm min-w-0">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                              <span className="material-symbols-outlined text-blue-500 text-[18px]">air</span>
                              SpO2
                            </div>
                            <p className="text-xl font-black text-slate-900 dark:text-white">
                              98 <span className="text-sm font-bold text-slate-500">%</span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <label className="flex cursor-pointer items-start justify-between gap-3 min-w-0 select-none">
                            <span className="flex gap-2 min-w-0">
                              <span className="material-symbols-outlined text-red-500 shrink-0" aria-hidden>
                                notifications_active
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold text-slate-900 dark:text-white">Auto-SOS triggers</span>
                                <span className="block text-xs text-slate-500 dark:text-slate-400 break-words">
                                  Alert authorities on fall detection
                                </span>
                              </span>
                            </span>
                            <span className="relative mt-0.5 inline-flex h-7 w-[3.25rem] shrink-0 items-center">
                              <input
                                type="checkbox"
                                role="switch"
                                checked={autoSosTrigger}
                                onChange={(e) => setAutoSosTrigger(e.target.checked)}
                                className="peer sr-only"
                                aria-label="Auto-SOS triggers on fall detection"
                              />
                              <span
                                className="pointer-events-none absolute inset-0 rounded-full bg-slate-300 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2D54A8] peer-focus-visible:ring-offset-2 dark:bg-slate-600 peer-checked:bg-[#2D54A8] dark:peer-checked:bg-[#2D54A8] after:absolute after:left-[3px] after:top-1/2 after:h-[22px] after:w-[22px] after:-translate-y-1/2 after:rounded-full after:bg-white after:shadow-md after:transition-transform after:duration-200 after:content-[''] peer-checked:after:translate-x-[27px]"
                              />
                            </span>
                          </label>

                          <label className="flex cursor-pointer items-start justify-between gap-3 min-w-0 select-none">
                            <span className="flex gap-2 min-w-0">
                              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 shrink-0" aria-hidden>
                                location_on
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold text-slate-900 dark:text-white">
                                  Emergency location sharing
                                </span>
                                <span className="block text-xs text-slate-500 dark:text-slate-400 break-words">
                                  Precision GPS for first responders
                                </span>
                              </span>
                            </span>
                            <span className="relative mt-0.5 inline-flex h-7 w-[3.25rem] shrink-0 items-center">
                              <input
                                type="checkbox"
                                role="switch"
                                checked={emergencyLocationShare}
                                onChange={(e) => setEmergencyLocationShare(e.target.checked)}
                                className="peer sr-only"
                                aria-label="Share precise location with first responders during emergencies"
                              />
                              <span
                                className="pointer-events-none absolute inset-0 rounded-full bg-slate-300 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2D54A8] peer-focus-visible:ring-offset-2 dark:bg-slate-600 peer-checked:bg-[#2D54A8] dark:peer-checked:bg-[#2D54A8] after:absolute after:left-[3px] after:top-1/2 after:h-[22px] after:w-[22px] after:-translate-y-1/2 after:rounded-full after:bg-white after:shadow-md after:transition-transform after:duration-200 after:content-[''] peer-checked:after:translate-x-[27px]"
                              />
                            </span>
                          </label>
                        </div>

                        <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:justify-end">
                          <button
                            type="button"
                            onClick={() => setLastSyncedLabel('Just now')}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-semibold text-[#2D54A8] dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            Sync history
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsWatchPanelExpanded(false)}
                            className="px-4 py-2 rounded-xl bg-[#2D54A8] hover:bg-[#244688] text-white text-sm font-semibold shadow-sm"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Medical Info & Contacts */}
            <div className="flex min-w-0 flex-col gap-6">
              {/* Medical ID Card */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-slate-900 dark:bg-slate-950 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-white text-xl">badge</span>
                    <h3 className="text-white font-bold">Medical ID</h3>
                  </div>
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                    Critical Info
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4">
                  {/* Patient Info */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-600">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" 
                        alt="Patient" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">Alex Johnson</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Male • 38 Years</p>
                    </div>
                  </div>

                  {/* Vital Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 font-bold">Blood Type</p>
                      <p className="text-2xl font-black text-slate-800 dark:text-white">O+</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1 font-bold">Weight</p>
                      <p className="text-2xl font-black text-slate-800 dark:text-white">175 <span className="text-xs font-normal text-slate-500">lbs</span></p>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">warning</span> Allergies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs font-bold rounded border border-red-100 dark:border-red-800/50">
                        Penicillin
                      </span>
                      <span className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs font-bold rounded border border-red-100 dark:border-red-800/50">
                        Peanuts
                      </span>
                    </div>
                  </div>

                  {/* Chronic Conditions */}
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 font-bold">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded">
                        Type 2 Diabetes
                      </span>
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 font-bold">Current Medications</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs py-2 px-3 bg-slate-50 dark:bg-slate-900 rounded">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Metformin</span>
                        <span className="text-slate-500 dark:text-slate-400">500mg</span>
                      </div>
                      <div className="flex justify-between items-center text-xs py-2 px-3 bg-slate-50 dark:bg-slate-900 rounded">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Lisinopril</span>
                        <span className="text-slate-500 dark:text-slate-400">10mg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 dark:text-white">Emergency Contacts</h3>
                  <button className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Contact 1 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
                        alt="Sarah Johnson" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Sarah Johnson</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Wife • Priority 1</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors shadow-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">call</span>
                      Call
                    </button>
                  </div>

                  {/* Contact 2 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
                        alt="Michael Johnson" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Michael Johnson</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Brother • Priority 2</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors shadow-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">call</span>
                      Call
                    </button>
                  </div>

                  {/* Contact 3 - Doctor */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-lg">medical_services</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Dr. Wilson</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Primary Care</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">call</span>
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmergencyCallModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        location={userLocation}
      />
      <EmergencyFullMapModal
        isOpen={isFullMapOpen}
        onClose={() => setIsFullMapOpen(false)}
        initialLocation={emergencyCenter}
      />
    </div>
  );
}