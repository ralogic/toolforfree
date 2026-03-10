'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState('');
  const [domain, setDomain] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const [sitemap, setSitemap] = useState('');

  const generateSitemap = () => {
    const urlList = urls.split('\n').filter((url) => url.trim());
    const lastmod = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urlList.forEach((url) => {
      const fullUrl = url.trim().startsWith('http') ? url.trim() : `${domain}${url.trim()}`;
      xml += '  <url>\n';
      xml += `    <loc>${fullUrl}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>${frequency}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';
    setSitemap(xml);
  };

  const downloadFile = () => {
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🗺️"
        title="XML Sitemap Generator"
        description="Generate an XML sitemap for your website to help search engines discover and index your pages effectively."
      />

      <ToolContainer title="Create Sitemap">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Domain (e.g., https://example.com)
            </label>
            <input
              type="url"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              URLs (one per line, with or without domain)
            </label>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="/&#10;/about&#10;/contact&#10;/blog/post-1"
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Change Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="always">Always</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Priority (0.0 - 1.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <button
            onClick={generateSitemap}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate Sitemap
          </button>

          {sitemap && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">Generated Sitemap</label>
                  <button
                    onClick={downloadFile}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Download XML
                  </button>
                </div>
                <textarea
                  value={sitemap}
                  readOnly
                  className="w-full h-96 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-xs"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🚀 SEO Boost</h3>
            <p className="mt-2 text-sm text-slate-600">Improve search indexing</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚙️ Customizable</h3>
            <p className="mt-2 text-sm text-slate-600">Set frequency & priority</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📥 XML Format</h3>
            <p className="mt-2 text-sm text-slate-600">Standard compliant export</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter your website domain</li>
          <li>List all your page URLs (one per line)</li>
          <li>Choose change frequency and priority</li>
          <li>Click "Generate Sitemap"</li>
          <li>Download the XML file</li>
          <li>Upload to your website root</li>
          <li>Submit to Google Search Console</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is an XML sitemap?',
            answer: 'An XML sitemap is a file that lists all important pages on your website, helping search engines discover and index them.'
          },
          {
            question: 'Where should I place the sitemap?',
            answer: 'Upload it to your website root (https://example.com/sitemap.xml) and submit the URL to search engines.'
          },
          {
            question: 'What is priority and change frequency?',
            answer: 'Priority indicates importance (0.0-1.0), and changefreq tells search engines how often the page updates.'
          },
          {
            question: 'How many URLs can I include?',
            answer: 'While sitemaps can contain up to 50,000 URLs, this tool is best for smaller sites. Split large sites into multiple sitemaps.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Robots.txt Generator', slug: 'robots-txt-generator', icon: '🤖' },
          { name: 'Meta Tag Generator', slug: 'meta-tag-generator', icon: '🏷️' },
          { name: 'Keyword Density Checker', slug: 'keyword-density-checker', icon: '🔍' }
        ]}
      />
    </main>
  );
}
