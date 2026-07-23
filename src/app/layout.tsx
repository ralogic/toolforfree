import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeferredGlobalUI from '@/components/DeferredGlobalUI';
import './globals.css';

const oneSignalAppId = 'ef0bd327-e01f-44ef-a0e1-0b80f77d28c4';
const oneSignalSafariWebId = 'web.onesignal.auto.10bba952-d3e6-4be7-b269-bd5caae877a4';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://toolforfree.in'),
  title: 'ToolForFree - Free Online PDF, Image & Developer Tools',
  description: 'Free online tools for PDF, images, text and developers. Merge PDFs, compress images, format JSON, and more. Fast, secure, no signup required.',
  keywords: [
    'free online tools',
    'pdf tools free',
    'image compressor online',
    'merge pdf online',
    'developer tools',
    'json formatter',
    'base64 encoder',
    'text tools',
    'word counter',
    'password generator',
  ],
  authors: [{ name: 'ToolForFree', url: 'https://toolforfree.in' }],
  creator: 'ToolForFree',
  publisher: 'ToolForFree',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/assets/images/favicon.png',
    shortcut: '/assets/images/favicon.png',
    apple: '/assets/images/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolforfree.in',
    title: 'ToolForFree - Free Online PDF, Image & Developer Tools',
    description: 'Free online tools for PDF, images, text and developers. Fast, secure and no signup required.',
    siteName: 'ToolForFree',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolForFree - Free Online Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolForFree - Free Online PDF, Image & Developer Tools',
    description: 'Free online tools for PDF, images, text and developers. Fast, secure and no signup required.',
    images: ['/assets/images/og-image.png'],
    creator: '@toolforfree',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://toolforfree.in',
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToolForFree',
    url: 'https://toolforfree.in',
  };

  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />

        <Script
          id="onesignal-deferred-queue"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: 'window.OneSignalDeferred = window.OneSignalDeferred || [];',
          }}
        />
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="beforeInteractive"
        />
        <Script
          id="onesignal-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: '${oneSignalAppId}',
                  safari_web_id: '${oneSignalSafariWebId}',
                  serviceWorkerPath: 'push/onesignal/OneSignalSDKWorker.js',
                  serviceWorkerParam: { scope: '/push/onesignal/' },
                  notifyButton: {
                    enable: true,
                  },
                });
              });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[var(--bg-page)] text-[var(--text-primary)] antialiased relative`}>
        {/* Schema.org Website markup */}
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1194350296944754"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F54ZZ47D8R"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F54ZZ47D8R');
            `,
          }}
        />

        <DeferredGlobalUI />
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
