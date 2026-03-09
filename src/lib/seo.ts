import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

export const generateMetadata = (config: SEOConfig): Metadata => {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      images: config.ogImage ? [{ url: config.ogImage }] : undefined,
      url: config.canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    alternates: config.canonical ? { canonical: config.canonical } : undefined,
  };
};

export const generateWebApplicationSchema = (toolName: string, description: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    description: description,
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    processorRequirements: 'Requires JavaScript',
  };
};

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
