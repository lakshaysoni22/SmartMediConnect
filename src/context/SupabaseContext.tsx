import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';

type SupabaseContextValue = {
  supabase: SupabaseClient | null;
  session: Session | null;
  ready: boolean;
  configured: boolean;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setReady(true);
      return;
    }

    let cancelled = false;
    client.auth.getSession().then(({ data: { session: s } }) => {
      if (!cancelled) {
        setSession(s);
        setReady(true);
      }
    });

    const {
      data: { subscription }
    } = client.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<SupabaseContextValue>(
    () => ({
      supabase: getSupabase(),
      session,
      ready,
      configured: isSupabaseConfigured
    }),
    [session, ready]
  );

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabaseContext(): SupabaseContextValue {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error('useSupabaseContext must be used within SupabaseProvider');
  }
  return ctx;
}
