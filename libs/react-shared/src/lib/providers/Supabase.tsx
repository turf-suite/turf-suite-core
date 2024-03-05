import { useContext, createContext } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React, { ReactNode } from 'react';
import assert from 'assert';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('Content needs a supabase provider!');
  }
  return context;
};

interface SupabaseProviderProps {
  url: string;
  supabaseKey: string;
  children?: ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  url,
  supabaseKey,
  children,
}) => {
  const supabase = createClient(url ?? '', supabaseKey ?? '');
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
