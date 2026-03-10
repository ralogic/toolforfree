import { Metadata } from 'next';
import { generateMetadata, generateSoftwareApplicationSchema, generateBreadcrumbSchema } from './seo';
import { TOOLS_CATALOG, ToolItem } from './tools-catalog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolforfree.in';

/**
 * Generate complete metadata for a tool page
 */
export function generateToolMetadata(tool: ToolItem): Metadata {
  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;
  
  return generateMetadata({
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
    keywords: [
      ...tool.keywords,
      'free',
      'online',
      'no signup',
      'privacy-focused',
      tool.category.toLowerCase(),
    ],
    canonical: toolUrl,
    ogImage: `${SITE_URL}/assets/images/og-tool-${tool.slug}.png`,
  });
}

/**
 * Generate SoftwareApplication schema for a tool
 */
export function generateToolSchema(tool: ToolItem) {
  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;
  
  return generateSoftwareApplicationSchema({
    name: tool.name,
    description: tool.description,
    url: toolUrl,
    category: getCategoryType(tool.category),
  });
}

/**
 * Generate Breadcrumb schema for a tool page
 */
export function generateToolBreadcrumb(tool: ToolItem) {
  return generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: tool.category, url: `${SITE_URL}/tools?category=${tool.category.toLowerCase().replace(' tools', '')}` },
    { name: tool.name, url: `${SITE_URL}/tools/${tool.slug}` },
  ]);
}

/**
 * Get the appropriate schema.org category type
 */
function getCategoryType(category: string): string {
  const categoryMap: Record<string, string> = {
    'PDF Tools': 'UtilityApplication',
    'Image Tools': 'DesignApplication',
    'Developer Tools': 'DeveloperApplication',
    'Text Tools': 'UtilityApplication',
    'Utility Tools': 'UtilityApplication',
    'SEO Tools': 'BusinessApplication',
  };
  
  return categoryMap[category] || 'UtilityApplication';
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS_CATALOG.allTools.find((tool) => tool.slug === slug);
}

/**
 * Generate related tools for a given tool
 */
export function getRelatedTools(tool: ToolItem, limit: number = 4): ToolItem[] {
  return TOOLS_CATALOG.allTools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit);
}

/**
 * Common FAQ items for tool pages
 */
export const commonToolFAQs = [
  {
    question: 'Is this tool free to use?',
    answer: 'Yes, this tool is completely free with no hidden charges or limitations. No signup or subscription required.',
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No account needed! You can use this tool instantly without any registration or login.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely! All processing happens directly in your browser. Your files never leave your device, ensuring complete privacy and security.',
  },
  {
    question: 'Can I use this tool on mobile?',
    answer: 'Yes! This tool is fully responsive and works perfectly on all devices including smartphones and tablets.',
  },
];

/**
 * Generate tool-specific FAQ items based on tool type
 */
export function generateToolSpecificFAQs(tool: ToolItem): Array<{ question: string; answer: string }> {
  const specificFAQs: Record<string, Array<{ question: string; answer: string }>> = {
    'PDF Tools': [
      {
        question: 'What is the maximum file size I can upload?',
        answer: 'You can process PDF files up to 100MB. All processing happens in your browser for security.',
      },
      {
        question: 'Will there be any watermarks on the output?',
        answer: 'No watermarks ever! Your output files are clean and ready to use without any branding.',
      },
    ],
    'Image Tools': [
      {
        question: 'What image formats are supported?',
        answer: 'We support all common formats including JPG, PNG, WebP, GIF, and more.',
      },
      {
        question: 'Will the image quality be affected?',
        answer: 'We use advanced algorithms to maintain the best possible quality while optimizing file size.',
      },
    ],
    'Developer Tools': [
      {
        question: 'Do I need any technical knowledge?',
        answer: 'No! Our tools are designed to be simple and intuitive for everyone, from beginners to experts.',
      },
      {
        question: 'Can I use this for commercial projects?',
        answer: 'Yes! All our tools are free to use for both personal and commercial projects.',
      },
    ],
  };
  
  return [...commonToolFAQs, ...(specificFAQs[tool.category] || [])];
}
