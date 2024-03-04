import { useContext, createContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ReactNode } from 'react';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('Content needs a supabase provider!');
  }
  return context;
};

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL ?? '',
    process.env.VITE_SUPABASE_KEY ?? ''
  );
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}
