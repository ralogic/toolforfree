import { Metadata } from 'next';
import { getToolBySlug, generateToolMetadata } from '@/lib/tool-seo';

// Generate metadata for JSON Formatter
export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('json-formatter');
  if (!tool) {
    return {
      title: 'JSON Formatter - Free Online Tool',
      description: 'Format and validate JSON online for free',
    };
  }
  return generateToolMetadata(tool);
}

export default function JSONFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
