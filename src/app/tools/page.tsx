'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TOOLS_CATALOG, searchTools } from '@/lib/tools-catalog';

export default function ToolsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { name: 'PDF Tools', key: 'pdf', color: 'from-red-500 to-pink-500' },
    { name: 'Image Tools', key: 'image', color: 'from-blue-500 to-cyan-500' },
    { name: 'Text Tools', key: 'text', color: 'from-green-500 to-emerald-500' },
    { name: 'Developer Tools', key: 'developer', color: 'from-purple-500 to-indigo-500' },
    { name: 'Utility Tools', key: 'utility', color: 'from-yellow-500 to-orange-500' }
  ];

  // Determine which tools to display
  let displayedTools = TOOLS_CATALOG.allTools;

  if (searchQuery.trim()) {
    displayedTools = searchTools(searchQuery);
  } else if (selectedCategory !== 'all') {
    const categoryMap = {
      pdf: 'PDF Tools',
      image: 'Image Tools',
      text: 'Text Tools',
      developer: 'Developer Tools',
      utility: 'Utility Tools'
    };
    displayedTools = TOOLS_CATALOG.allTools.filter(
      tool => tool.category === categoryMap[selectedCategory as keyof typeof categoryMap]
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Tools</h1>
          <p className="text-xl text-blue-100">
            Explore our collection of 25 free online tools to simplify your workflow
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory('all');
            }}
            className="w-full px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg transition-colors"
          />
          <span className="absolute right-4 top-4 text-gray-400">🔍</span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'all' && !searchQuery
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                setSearchQuery('');
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.key && !searchQuery
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            {searchQuery ? (
              <>
                Found <span className="font-bold text-gray-900">{displayedTools.length}</span> tool{displayedTools.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </>
            ) : (
              <>
                Showing <span className="font-bold text-gray-900">{displayedTools.length}</span> tool{displayedTools.length !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        {/* Tools Grid */}
        {displayedTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedTools.map(tool => {
              const category = categories.find(c => c.name === tool.category);
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300"
                >
                  {/* Category Badge */}
                  <div className={`h-1 bg-gradient-to-r ${category?.color || 'from-gray-300 to-gray-400'}`} />
                  
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Icon and Category */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{tool.icon}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${category?.color} text-white`}>
                        {tool.category.split(' ')[0]}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2">
                      {tool.keywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* Arrow Indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                      Open Tool
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500 mb-2">No tools found</p>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or browse by category
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">25</div>
              <p className="text-gray-400">Total Tools</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">5</div>
              <p className="text-gray-400">PDF Tools</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">5</div>
              <p className="text-gray-400">Image Tools</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">5</div>
              <p className="text-gray-400">Text Tools</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">10</div>
              <p className="text-gray-400">Dev & Utility</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-700 mb-6">
            ToolForFree is constantly adding new tools and features. Check back soon for more utilities!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center font-medium"
            >
              Suggest a Tool
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
