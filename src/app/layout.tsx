import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from '@/components/Toast';
import FloatingShapes from '@/components/FloatingShapes';
import GradientOrbs from '@/components/GradientOrbs';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'ToolForFree – Free Online PDF, Image & Developer Tools',
  description: 'ToolForFree provides free online tools for images, PDFs, text and developers. Fast, secure and no signup required.',
  keywords: 'free online tools, pdf tools, image tools, developer tools',
  authors: [{ name: 'ToolForFree' }],
  icons: {
    icon: '/assets/images/favicon.png',
  },
  openGraph: {
    title: 'ToolForFree – Free Online Tools',
    description: 'Free online tools for PDF, image, text and developers. No login required.',
    type: 'website',
    url: 'https://toolforfree.in/',
    images: '/assets/images/og-image.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        
        {/* Schema.org Website markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ToolForFree',
              url: 'https://toolforfree.in',
            }),
          }}
        />
        
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[var(--bg-page)] text-[var(--text-primary)] antialiased relative`}>
        <FloatingShapes />
        <GradientOrbs />
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
