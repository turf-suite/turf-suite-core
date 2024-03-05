import { ChakraProvider } from '@chakra-ui/react';

interface ThemeProviderProps {
  theme: Record<string, any>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
