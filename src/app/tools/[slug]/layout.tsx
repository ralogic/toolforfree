import type { Metadata } from 'next';
import { TOOLS_CATALOG } from '@/lib/tools-catalog';
import { generateMetadata as generateSEOMetadata, generateWebApplicationSchema } from '@/lib/seo';

interface ToolPageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_CATALOG.allTools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'Tool Not Found - ToolForFree',
      description: 'The requested tool could not be found.',
    };
  }

  return generateSEOMetadata({
    title: `${tool.name} - Free Online Tool | ToolForFree`,
    description: tool.description,
    keywords: [tool.name, ...tool.keywords, 'free online tool', 'no signup'],
    canonical: `https://toolforfree.in/tools/${tool.slug}`,
    ogImage: '/assets/images/og-image.png',
  });
}

export default function ToolLayout({ children }: ToolPageLayoutProps) {
  return <>{children}</>;
}
