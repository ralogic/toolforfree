'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { downloadFile } from '@/lib/utils';

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFiles: File[]) => {
    const pdfFiles = selectedFiles.filter(f => f.type === 'application/pdf');
    if (pdfFiles.length !== selectedFiles.length) {
      setError('Only PDF files are supported');
    }
    setFiles([...files, ...pdfFiles]);
    setError('');
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please upload at least 2 PDF files');
      return;
    }

    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      downloadFile(blob, 'merged.pdf');
      setError('');
    } catch (err) {
      setError('Error merging PDFs: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <>
      <ToolHero
        icon="📄"
        title="PDF Merger"
        description="Combine multiple PDF files into a single document. Reorder pages by dragging."
      />

      <ToolContainer title="Upload PDF Files">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept=".pdf"
          multiple={true}
          label="Upload PDFs"
          description="Drag and drop your PDF files here or click to select"
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

      {files.length > 0 && (
        <ToolContainer title={`Selected Files (${files.length})`}>
          <div className="space-y-3 mb-6">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-600">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(idx)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={mergePDFs}
            disabled={loading || files.length < 2}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Merging PDFs...' : 'Merge PDFs'}
          </button>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload PDFs</h3>
            <p className="text-gray-700">Drag and drop or click to select multiple PDF files.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Arrange Order</h3>
            <p className="text-gray-700">Remove files you don't need. Files are merged in the order shown.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Merge & Download</h3>
            <p className="text-gray-700">Click "Merge PDFs" to combine all files and download the result.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is the file size limit?',
            answer: 'There is no strict limit, but browser memory constraints may apply. Most modern browsers can handle files up to several hundred MB.'
          },
          {
            question: 'Are my files stored?',
            answer: 'No. All processing happens in your browser. Your files are never uploaded to any server.'
          },
          {
            question: 'Can I reorder the PDFs?',
            answer: 'Yes! Remove files and re-upload them in the order you want them merged.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF Split', slug: 'pdf-split', icon: '✂️' },
          { name: 'PDF Compress', slug: 'pdf-compress', icon: '🗜️' },
          { name: 'PDF to Image', slug: 'pdf-to-image', icon: '🖼️' }
        ]}
      />
    </>
  );
}
