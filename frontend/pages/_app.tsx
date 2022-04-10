import '@traboda/dsr/dist/tailwind.css';
import '../src/styles/style.css';
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react'
import { MantineProvider } from '@mantine/core';

// if(typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
//   const ReactDOM = require('react-dom');
//   const axe = require('@axe-core/react');
//   axe(React, ReactDOM, 1000);
// }

export default function WebApp({ Component, pageProps }: AppProps) {

  return (
      <>
        <Head>
          <meta
              name="viewport"
              content="width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1"
          />
        </Head>
        <ChakraProvider>
            <MantineProvider  withGlobalStyles withNormalizeCSS>
                <Component {...pageProps} />
            </MantineProvider>
        </ChakraProvider>
      </>
  );
}