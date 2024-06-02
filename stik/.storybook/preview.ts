import { extendTheme } from '@chakra-ui/react';

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

export const parameters = {
  chakra: {
    theme,
  },
};
