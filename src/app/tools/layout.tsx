import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Free Online Tools for PDF, Image and Developer Work',
  description: 'Browse ToolForFree tools for PDF editing, image processing, text utilities, and developer workflows. Fast browser-based tools with mobile support and no signup.',
  alternates: {
    canonical: 'https://toolforfree.in/tools',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
