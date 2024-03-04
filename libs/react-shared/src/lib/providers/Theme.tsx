import { ChakraProvider } from '@chakra-ui/react';

export default function ThemeProvider(
  theme: Record<string, any>,
  { children }: { children: React.ReactNode }
) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
