import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@gaoridang/ui/components/ui/sonner';

import { cn } from '@gaoridang/ui/lib/utils';
import ReactQueryProviders from './providers/ServerQueryClientProvider';

export const metadata: Metadata = {
  title: 'The Livinbooks',
  description: '내 이야기를 책으로 만들어보세요!',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn('h-full')}>
        <ReactQueryProviders>
          <main>{children}</main>
        </ReactQueryProviders>
        <Toaster />
      </body>
    </html>
  );
}
