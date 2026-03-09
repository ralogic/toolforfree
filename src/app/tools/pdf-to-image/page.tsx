'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { downloadFile } from '@/lib/utils';
import { getPdfJs } from '@/lib/lazy-loaders';

export default function PDFToImagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [format, setFormat] = useState<'png' | 'jpg'>('png');

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
      const pdfjsLib = await getPdfJs();
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPages(pdf.numPages);
      setSelectedPages([1]);
    } catch (err) {
      setError('Error reading PDF');
    }
  };

  const togglePage = (pageNum: number) => {
    if (selectedPages.includes(pageNum)) {
      setSelectedPages(selectedPages.filter(p => p !== pageNum));
    } else {
      setSelectedPages([...selectedPages, pageNum].sort((a, b) => a - b));
    }
  };

  const convertToImages = async () => {
    if (!file || selectedPages.length === 0) {
      setError('Please select at least one page');
      return;
    }

    setLoading(true);
    try {
      const pdfjsLib = await getPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      for (const pageNum of selectedPages) {
        const page = await pdf.getPage(pageNum);
        const scale = 2;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d');
        if (!context) continue;

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        canvas.toBlob((blob) => {
          if (blob) {
            const ext = format === 'png' ? 'png' : 'jpg';
            downloadFile(blob, `page-${pageNum}.${ext}`);
          }
        }, `image/${format === 'png' ? 'png' : 'jpeg'}`);
      }

      setError('');
    } catch (err) {
      setError('Error converting PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <>
      <ToolHero
        icon="🖼️"
        title="PDF to Image Converter"
        description="Convert PDF pages to PNG or JPG images. Extract images from any PDF file."
      />

      <ToolContainer title="Upload PDF">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept=".pdf"
          multiple={false}
          label="Upload PDF"
          description="Select a PDF to convert"
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

      {pages > 0 && (
        <ToolContainer title="Conversion Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Format
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="png"
                    checked={format === 'png'}
                    onChange={() => setFormat('png')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">PNG (Lossless)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="jpg"
                    checked={format === 'jpg'}
                    onChange={() => setFormat('jpg')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">JPG (Compressed)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Pages
              </label>
              <div className="grid grid-cols-6 md:grid-cols-8 gap-2 mb-4">
                {Array.from({ length: pages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => togglePage(pageNum)}
                    className={`p-2 rounded border-2 font-medium transition-all text-sm ${
                      selectedPages.includes(pageNum)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-900 hover:border-blue-400'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">Selected: {selectedPages.length} of {pages} pages</p>
            </div>

            <button
              onClick={convertToImages}
              disabled={loading || selectedPages.length === 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Converting...' : 'Convert to Images'}
            </button>
          </div>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload PDF</h3>
            <p className="text-gray-700">Select your PDF file.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Choose Format & Pages</h3>
            <p className="text-gray-700">Select PNG or JPG format and choose which pages to convert.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Download</h3>
            <p className="text-gray-700">Click "Convert to Images" to download your page images.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is the difference between PNG and JPG?',
            answer: 'PNG is lossless (sharp, larger files) best for documents with text. JPG is lossy (smaller files, slight quality loss) better for photos.'
          },
          {
            question: 'What resolution are the images?',
            answer: 'Images are rendered at 2x resolution (double the PDF resolution) for better quality on screens.'
          },
          {
            question: 'Can I convert all pages at once?',
            answer: 'Yes! Simply select all pages using the Ctrl+A shortcut or by clicking all page buttons, then convert.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image to PDF', slug: 'image-to-pdf', icon: '📄' },
          { name: 'PDF Merge', slug: 'pdf-merge', icon: '📄' },
          { name: 'Image Converter', slug: 'image-converter', icon: '🔄' }
        ]}
      />
    </>
  );
}
