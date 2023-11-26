'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { useContext, createContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('Content needs a supabase provider!');
  }
  return context;
};

export function Providers({ children }: { children: React.ReactNode }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
  );

  return (
    <CacheProvider>
      <ChakraProvider>
        <SupabaseContext.Provider value={supabase}>
          {children}
        </SupabaseContext.Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
