// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { SupabaseProvider } from '@turf-suite-core/react-shared';
import { RegisterPage } from '@turf-suite-core/ui';
import { LoginPage } from '@turf-suite-core/ui';

export function App() {
  return (
    <SupabaseProvider
      url={import.meta.env.VITE_SUPABASE_URL as string}
      supabaseKey={import.meta.env.VITE_SUPABASE_KEY as string}
    >
      <Routes>
        <Route path="/" element={<NxWelcome title="stik" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </SupabaseProvider>
  );
}

export default App;
