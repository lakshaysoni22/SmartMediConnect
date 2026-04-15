import { useJsApiLoader } from '@react-google-maps/api';

/** Google Maps JavaScript API key (browser key). Set `VITE_GOOGLE_MAPS_API_KEY` in `.env.local` / Vercel. */
export const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() ?? '';

// IMPORTANT: Keep these options identical everywhere in app.
// @react-google-maps/api throws if loader is called with different options.
const SHARED_LOADER_OPTIONS = {
  id: 'smartmedi-google-maps-loader',
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  preventGoogleFontsLoading: true
};

export function useSharedGoogleMapsLoader() {
  return useJsApiLoader(SHARED_LOADER_OPTIONS);
}
