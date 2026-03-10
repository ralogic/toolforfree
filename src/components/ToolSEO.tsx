'use client';

import Script from 'next/script';
import { ToolItem } from '@/lib/tools-catalog';
import { generateToolSchema, generateToolBreadcrumb, generateToolSpecificFAQs } from '@/lib/tool-seo';
import { generateFAQSchema } from '@/lib/seo';

interface ToolSEOProps {
  tool: ToolItem;
  additionalFAQs?: Array<{ question: string; answer: string }>;
}

/**
 * SEO component for tool pages
 * Includes SoftwareApplication, Breadcrumb, and FAQ structured data
 */
export default function ToolSEO({ tool, additionalFAQs = [] }: ToolSEOProps) {
  const toolSchema = generateToolSchema(tool);
  const breadcrumbSchema = generateToolBreadcrumb(tool);
  const faqItems = [...generateToolSpecificFAQs(tool), ...additionalFAQs];
  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      {/* SoftwareApplication Schema */}
      <Script
        id={`tool-schema-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolSchema),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id={`breadcrumb-schema-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* FAQ Schema */}
      {faqItems.length > 0 && (
        <Script
          id={`faq-schema-${tool.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}
