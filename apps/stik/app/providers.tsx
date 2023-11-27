'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
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
  const theme = extendTheme({
    colors: {
      accent: {
        100: '#d1c2f7',
        200: '#b29af3',
        300: '#916fef',
        400: '#754eeb',
        500: '#542ce7',
        600: '#4727e0',
        700: '#2e1fd8',
        800: '#0019d2',
        900: '#0007cb',
      },
      primary: {
        100: '#e9efff',
        200: '#C6D6FF',
        300: '#a1bcfb',
        400: '#7aa1f3',
        500: '#588aed',
        600: '#3073e7',
        700: '#276adc',
        800: '#175fcf',
        900: '#0754c2',
      },
    },
  });

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <SupabaseContext.Provider value={supabase}>
          {children}
        </SupabaseContext.Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
