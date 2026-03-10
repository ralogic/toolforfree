'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function SqlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatSql = () => {
    if (!input.trim()) {
      alert('Please enter SQL code');
      return;
    }

    try {
      // Simple SQL formatter
      let formatted = input
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',\n  ')
        .replace(/\b(SELECT|FROM|WHERE|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ORDER BY|GROUP BY|HAVING|LIMIT|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|CREATE TABLE|ALTER TABLE)\b/gi, '\n$1')
        .replace(/\bAND\b/gi, '\n  AND')
        .replace(/\bOR\b/gi, '\n  OR')
        .trim();
      
      setOutput(formatted);
    } catch (error) {
      alert('Error formatting SQL. Please check your query.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🗄️"
        title="SQL Formatter"
        description="Format and beautify SQL queries with proper indentation. Make your SQL code clean and readable."
      />

      <ToolContainer title="Format SQL Query">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              SQL Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your SQL query here..."
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={formatSql}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Format SQL
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Formatted Output
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-48 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">✨ Clean Format</h3>
            <p className="mt-2 text-sm text-slate-600">Proper indentation and structure</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📖 Readable Queries</h3>
            <p className="mt-2 text-sm text-slate-600">Easy to read and debug</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Format in milliseconds</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your SQL query in the input area</li>
          <li>Click "Format SQL"</li>
          <li>View the formatted query with proper indentation</li>
          <li>Copy the formatted SQL</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Does this validate SQL syntax?',
            answer: 'No, this tool only formats SQL. It doesn\'t validate or check for syntax errors.'
          },
          {
            question: 'What SQL dialects are supported?',
            answer: 'The formatter works with standard SQL and is compatible with MySQL, PostgreSQL, SQL Server, and Oracle.'
          },
          {
            question: 'Will it optimize my queries?',
            answer: 'No, this tool only formats for readability. It doesn\'t optimize query performance.'
          },
          {
            question: 'Is my SQL uploaded anywhere?',
            answer: 'No, all formatting happens in your browser. Your queries never leave your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' },
          { name: 'XML Formatter', slug: 'xml-formatter', icon: '📄' },
          { name: 'HTML Formatter', slug: 'html-formatter', icon: '📝' }
        ]}
      />
    </main>
  );
}
