import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolforfree.in';
const SITE_NAME = 'ToolForFree';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/og-image.png`;

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

/**
 * Generate complete metadata for any page
 */
export const generateMetadata = (config: SEOConfig): Metadata => {
  const fullTitle = config.title.includes(SITE_NAME) ? config.title : `${config.title} - ${SITE_NAME}`;
  
  return {
    title: fullTitle,
    description: config.description,
    keywords: config.keywords?.join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      images: config.ogImage ? [{ url: config.ogImage }] : [{ url: DEFAULT_OG_IMAGE }],
      url: config.canonical || SITE_URL,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : [DEFAULT_OG_IMAGE],
    },
    alternates: config.canonical ? { canonical: config.canonical } : undefined,
    robots: config.noindex 
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
};

/**
 * Generate SoftwareApplication schema for tool pages
 */
export const generateSoftwareApplicationSchema = (config: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    url: config.url,
    applicationCategory: config.category || 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: 'Free, No signup required, Privacy-focused, Fast processing',
    browserRequirements: 'Requires JavaScript',
  };
};

/**
 * Generate FAQ schema for rich results
 */
export const generateFAQSchema = (faqItems: Array<{ question: string; answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.png`,
    description: 'Free online tools for PDF, images, text processing and developer utilities',
    sameAs: [
      // Add social media profiles here when available
    ],
  };
};

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate WebSite schema with search action
 */
export const generateWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/tools?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generate ItemList schema for tool collections
 */
export const generateItemListSchema = (items: Array<{ name: string; url: string; description: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: item.name,
        url: item.url,
        description: item.description,
      },
    })),
  };
};
