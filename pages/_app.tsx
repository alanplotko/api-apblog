import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import DocumentHead from '@/components/DocumentHead';
import theme from '@/lib/theme/config';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DocumentHead />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
