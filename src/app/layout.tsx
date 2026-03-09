import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1194350296944754"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F54ZZ47D8R" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F54ZZ47D8R');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
