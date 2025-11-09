"use client";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import Script from "next/script";
import { Notifications } from '@mantine/notifications';
import { useNavigationEvents } from '@/hooks/useNavigationEvents';

// export const metadata = {
//   title: 'Mantine Next.js template',
//   description: 'I am using Mantine with Next.js!',
// };

export default function RootLayout({ children }: { children: any }) {
  const { loading } = useNavigationEvents();
  if (loading) console.log('loading ', new Date());
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <Script src="/runtimeConfig.js" strategy="beforeInteractive" />
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          {loading && (
            <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded shadow">Loading...</div>
            </div>
          )}
          
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
