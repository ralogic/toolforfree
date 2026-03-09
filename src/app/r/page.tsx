'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface Tool {
  name: string;
  slug: string;
  icon: string;
  category: string;
  description: string;
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recentTools, setRecentTools] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recentTools');
      if (stored) {
        setRecentTools(JSON.parse(stored).slice(0, 6));
      }
    }
  }, []);

  const tools: Tool[] = [
    // PDF Tools
    { name: 'PDF Merge', slug: 'pdf-merge', icon: '➕', category: 'PDF Tools', description: 'Combine multiple PDFs into one file.' },
    { name: 'PDF Split', slug: 'pdf-split', icon: '✂️', category: 'PDF Tools', description: 'Split PDF pages into separate files.' },
    { name: 'PDF Compressor', slug: 'pdf-compressor', icon: '🗜️', category: 'PDF Tools', description: 'Reduce PDF file size while maintaining quality.' },
    { name: 'PDF to JPG', slug: 'pdf-to-jpg', icon: '📄➡️🖼', category: 'PDF Tools', description: 'Convert PDF pages to high-quality JPG images.' },
    { name: 'JPG to PDF', slug: 'jpg-to-pdf', icon: '🖼➡️📄', category: 'PDF Tools', description: 'Convert JPG images into a PDF document.' },
    
    // Image Tools
    { name: 'Image Compressor', slug: 'image-compressor', icon: '📉', category: 'Image Tools', description: 'Compress images without losing quality.' },
    { name: 'Image Resizer', slug: 'image-resizer', icon: '📐', category: 'Image Tools', description: 'Resize images to custom dimensions.' },
    { name: 'Image Converter', slug: 'image-converter', icon: '🔄', category: 'Image Tools', description: 'Convert between different image formats.' },
    { name: 'Background Remover', slug: 'background-remover', icon: '🪄', category: 'Image Tools', description: 'Remove image backgrounds instantly.' },
    
    // Developer Tools
    { name: 'JSON Formatter', slug: 'json-formatter', icon: '🧩', category: 'Developer Tools', description: 'Format and validate JSON code.' },
    { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔁', category: 'Developer Tools', description: 'Encode and decode Base64 strings.' },
    { name: 'Password Generator', slug: 'password-generator', icon: '🔐', category: 'Developer Tools', description: 'Generate secure random passwords.' },
    
    // Text Tools
    { name: 'Case Converter', slug: 'case-converter', icon: '🔤', category: 'Text Tools', description: 'Convert text to different cases.' },
    { name: 'Word Counter', slug: 'word-counter', icon: '📝', category: 'Text Tools', description: 'Count words, characters, and paragraphs.' },
    { name: 'Remove Extra Spaces', slug: 'remove-extra-spaces', icon: '📏', category: 'Text Tools', description: 'Remove unnecessary spaces from text.' },
    
    // Utility Tools
    { name: 'Age Calculator', slug: 'age-calculator', icon: '📅', category: 'Utility Tools', description: 'Calculate age in years, months, and days.' },
  ];

  const categories = ['All', ...new Set(tools.map(t => t.category))];
  
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const popularTools = tools.slice(0, 8);
  const recentToolsData = tools.filter(t => recentTools.includes(t.slug));

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-900 pt-0">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 pt-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-400/25 to-blue-400/25 blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/25 to-purple-400/25 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 h-60 w-60 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="mx-auto max-w-4xl space-y-10">
          {/* Title Section */}
          <div className="animate-scale-in text-center space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 px-5 py-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse"></span>
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">All tools, one platform</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                Powerful Online Tools
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Compress PDFs, convert images, format text and more. Everything works in your browser, completely free.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-2xl opacity-40 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="flex items-center gap-4 bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl border-2 border-slate-200/30 dark:border-slate-700/30 rounded-2xl px-6 py-4 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20 transition-all duration-300 group-focus-within:border-indigo-500/40 dark:group-focus-within:border-indigo-600/40">
                <span className="text-2xl group-focus-within:scale-110 transition-transform duration-300">🔍</span>
                <input
                  type="text"
                  placeholder="Search tools like PDF merger, image compressor..."
                  className="flex-1 bg-transparent text-base sm:text-lg outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Search Suggestions */}
          {searchQuery.length === 0 && (
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {['PDF Merge', 'Image Compressor', 'JSON Formatter', 'Password Generator'].map((suggestion, idx) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="group relative px-5 py-2.5 rounded-full text-sm font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-900/40 hover:bg-indigo-200/80 dark:hover:bg-indigo-900/60 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{ animation: `slide-in-from-right 0.5s ease-out ${idx * 0.1}s both` }}
                >
                  <span className="flex items-center gap-2">
                    {suggestion}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Tools Section */}
      {recentToolsData.length === 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-4xl animate-float">🔥</span>
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100">Popular Tools</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">Trusted by thousands daily</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTools.map((tool, idx) => (
                <ToolCard key={tool.slug} tool={tool} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Used Tools */}
      {recentToolsData.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-10">
              <span className="text-4xl animate-float">⏱️</span>
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100">Recently Used</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">Quick access to your tools</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentToolsData.map((tool, idx) => (
                <ToolCard key={tool.slug} tool={tool} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="px-4 py-4 sm:px-6 lg:px-8 sticky top-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200/40 dark:border-slate-700/40 z-40 shadow-sm">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, idx) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                    : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {filteredTools.length === 0 ? (
            <div className="text-center py-24 space-y-6">
              <div className="text-7xl animate-float">🔍</div>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">No tools found</p>
                <p className="text-base text-slate-600 dark:text-slate-400 font-medium max-w-md mx-auto">Try searching for something else or browse all categories to find what you need</p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTools.map((tool, idx) => (
                <ToolCard key={tool.slug} tool={tool} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recentTools') || '[]';
      const recent = JSON.parse(stored);
      const filtered = recent.filter((s: string) => s !== tool.slug);
      const updated = [tool.slug, ...filtered].slice(0, 10);
      localStorage.setItem('recentTools', JSON.stringify(updated));
    }
  };

  return (
    <Link
      href={`/r/${tool.slug}`}
      onClick={handleClick}
      className="group relative animate-scale-in overflow-hidden rounded-2xl bg-gradient-to-br from-white/70 to-slate-50/70 dark:from-slate-800/70 dark:to-slate-900/70 backdrop-blur-xl border-2 border-slate-200/40 dark:border-slate-700/40 p-6 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/15 dark:hover:shadow-indigo-900/25 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 dark:hover:border-indigo-600/40"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-indigo-600/5 to-purple-600/5 dark:from-indigo-600/10 dark:to-purple-600/10 pointer-events-none"></div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 -z-10"></div>

      <div className="relative space-y-4">
        {/* Icon Container */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100/80 via-purple-100/60 to-blue-100/80 dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-blue-900/40 text-3xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-md group-hover:shadow-lg">
          {tool.icon}
        </div>

        {/* Content */}
        <div className="space-y-2.5">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-300">
            {tool.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 font-medium leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Category Badge & Arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/40 dark:border-slate-700/40">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-100/80 to-purple-100/80 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
            {tool.category}
          </span>
          <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
