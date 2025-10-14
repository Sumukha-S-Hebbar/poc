import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'TowerBuddy',
  description: 'Connecting Towercos with premier site locations.',
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          'min-h-screen bg-background font-sans'
        )}
      >
        {children}
      </body>
    </html>
  );
}
