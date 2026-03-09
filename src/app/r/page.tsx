import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Tools – ToolForFree',
  description: 'Browse all free online tools for PDF, images, text and developers.',
};

export default function ToolsPage() {
  const tools = [
    // PDF Tools
    { name: 'PDF Merge', slug: 'pdf-merge', icon: '➕', category: 'PDF Tools' },
    { name: 'PDF Split', slug: 'pdf-split', icon: '✂️', category: 'PDF Tools' },
    { name: 'PDF Compressor', slug: 'pdf-compressor', icon: '🗜️', category: 'PDF Tools' },
    { name: 'PDF to JPG', slug: 'pdf-to-jpg', icon: '📄➡️🖼', category: 'PDF Tools' },
    { name: 'JPG to PDF', slug: 'jpg-to-pdf', icon: '🖼➡️📄', category: 'PDF Tools' },
    
    // Image Tools
    { name: 'Image Compressor', slug: 'image-compressor', icon: '📉', category: 'Image Tools' },
    { name: 'Image Resizer', slug: 'image-resizer', icon: '📐', category: 'Image Tools' },
    { name: 'Image Converter', slug: 'image-converter', icon: '🔄', category: 'Image Tools' },
    { name: 'Background Remover', slug: 'background-remover', icon: '🪄', category: 'Image Tools' },
    
    // Developer Tools
    { name: 'JSON Formatter', slug: 'json-formatter', icon: '🧩', category: 'Developer Tools' },
    { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔁', category: 'Developer Tools' },
    { name: 'Password Generator', slug: 'password-generator', icon: '🔐', category: 'Developer Tools' },
    { name: 'Age Calculator', slug: 'age-calculator', icon: '📅', category: 'Utility Tools' },
    { name: 'Case Converter', slug: 'case-converter', icon: '🔤', category: 'Text Tools' },
    { name: 'Word Counter', slug: 'word-counter', icon: '📝', category: 'Text Tools' },
    { name: 'Remove Extra Spaces', slug: 'remove-extra-spaces', icon: '📏', category: 'Text Tools' },
  ];

  const groupedTools: Record<string, typeof tools> = {};
  tools.forEach(tool => {
    if (!groupedTools[tool.category]) {
      groupedTools[tool.category] = [];
    }
    groupedTools[tool.category].push(tool);
  });

  return (
    <div className="tools-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <h1>All Tools</h1>
        <p className="subtitle">Browse all free online tools available on ToolForFree</p>
      </div>

      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <section key={category} className="tools-section">
          <h2 className="tools-title">{category}</h2>
          <div className="tools-grid">
            {categoryTools.map(tool => (
              <Link key={tool.slug} href={`/r/${tool.slug}`} className="tool-box">
                <div className="tool-icon">{tool.icon}</div>
                <p>{tool.name}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
