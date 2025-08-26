import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://' + process.env.NEXT_PUBLIC_VERCEL_URL),
  title: 'Tabla Periódica Interactiva',
  description: 'Una tabla periódica interactiva, moderna y multilingüe, construida con Next.js y ShadCN. Explora los elementos con facilidad.',
  manifest: '/manifest.json',
  icons: {
    icon: 'https://raw.githubusercontent.com/viviraplicaciones/tablaperiodica/refs/heads/main/atomo.png',
    apple: 'https://raw.githubusercontent.com/viviraplicaciones/tablaperiodica/refs/heads/main/atomo.png',
  },
  openGraph: {
    title: 'Tabla Periódica Interactiva',
    description: 'Una tabla periódica interactiva y moderna. Explora los elementos, sus propiedades y su historia.',
    url: 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL,
    siteName: 'Tabla Periódica Interactiva',
    images: [
      {
        url: 'https://raw.githubusercontent.com/viviraplicaciones/tablaperiodica/main/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vista previa de la Tabla Periódica Interactiva',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tabla Periódica Interactiva',
    description: 'Una tabla periódica interactiva y moderna. Explora los elementos, sus propiedades y su historia.',
    images: ['https://raw.githubusercontent.com/viviraplicaciones/tablaperiodica/main/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#30475E" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
