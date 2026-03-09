'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { downloadFile } from '@/lib/utils';

export default function PDFSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (files: File[]) => {
    if (files.length === 0) return;
    const pdfFile = files[0];
    if (pdfFile.type !== 'application/pdf') {
      setError('Only PDF files are supported');
      return;
    }

    setFile(pdfFile);
    getPageCount(pdfFile);
    setError('');
  };

  const getPageCount = async (pdfFile: File) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
      setSelectedPages([]);
    } catch (err) {
      setError('Error reading PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const togglePage = (pageNum: number) => {
    if (selectedPages.includes(pageNum)) {
      setSelectedPages(selectedPages.filter(p => p !== pageNum));
    } else {
      setSelectedPages([...selectedPages, pageNum].sort((a, b) => a - b));
    }
  };

  const selectAll = () => {
    setSelectedPages(Array.from({ length: pageCount }, (_, i) => i + 1));
  };

  const clearSelection = () => {
    setSelectedPages([]);
  };

  const extractPages = async () => {
    if (!file || selectedPages.length === 0) {
      setError('Please select at least one page');
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      for (const pageNum of selectedPages) {
        const [copiedPage] = await newPdf.copyPages(pdf, [pageNum - 1]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      downloadFile(blob, 'extracted.pdf');
    } catch (err) {
      setError('Error extracting pages: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <>
      <ToolHero
        icon="✂️"
        title="PDF Splitter"
        description="Extract specific pages from PDF. Create custom PDFs with only the pages you need."
      />

      <ToolContainer title="Upload PDF">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept=".pdf"
          multiple={false}
          label="Upload PDF"
          description="Select a PDF file to split"
        />
      </ToolContainer>

      {error && (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <strong>❌ Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {pageCount > 0 && (
        <ToolContainer title={`Select Pages (Total: ${pageCount})`}>
          <div className="mb-6 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
              >
                Select All
              </button>
              <button
                onClick={clearSelection}
                className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Clear
              </button>
            </div>
            <p className="text-sm text-gray-600">Selected: {selectedPages.length} of {pageCount} pages</p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-6">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => togglePage(pageNum)}
                className={`p-3 rounded border-2 font-medium transition-all ${
                  selectedPages.includes(pageNum)
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-blue-400'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={extractPages}
            disabled={loading || selectedPages.length === 0}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Extracting Pages...' : 'Extract Selected Pages'}
          </button>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload PDF</h3>
            <p className="text-gray-700">Select your PDF file.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Select Pages</h3>
            <p className="text-gray-700">Click on page numbers to select which pages to extract.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Download</h3>
            <p className="text-gray-700">Click "Extract Selected Pages" to download your new PDF.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Can I split a PDF into individual pages?',
            answer: 'Yes! You can select individual pages and extract them. For bulk extraction, apply one page at a time or select multiple pages.'
          },
          {
            question: 'Are pages deleted from the original?',
            answer: 'No. The original PDF is not modified. You get a new PDF with only the selected pages.'
          },
          {
            question: 'Can I reorder pages while extracting?',
            answer: 'Yes! Pages are extracted in numerical order. To reorder, use the PDF Merger tool after splitting.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF Merge', slug: 'pdf-merge', icon: '📄' },
          { name: 'PDF Compress', slug: 'pdf-compress', icon: '🗜️' },
          { name: 'PDF to Image', slug: 'pdf-to-image', icon: '🖼️' }
        ]}
      />
    </>
  );
}
