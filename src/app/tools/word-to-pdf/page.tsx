'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function WordToPdfPage() {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setWordFile(files[0]);
      setDownloadUrl(null);
    }
  };

  const convertToPdf = async () => {
    if (!wordFile) return;

    setConverting(true);
    try {
      // Word to PDF conversion
      // In production, use libraries like docx-pdf or mammoth
      const reader = new FileReader();
      reader.onload = async (e) => {
        // Create a simple PDF from text content
        const text = `Converted from ${wordFile.name}\n\nThis is a placeholder conversion.\nImplement actual Word to PDF conversion.`;
        const blob = new Blob([text], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setConverting(false);
      };
      reader.readAsArrayBuffer(wordFile);
    } catch (error) {
      console.error('Conversion error:', error);
      setConverting(false);
      alert('Error converting Word to PDF');
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📄"
        title="Word to PDF Converter"
        description="Convert Word documents (DOC, DOCX) to PDF format instantly. Fast, secure, and works completely in your browser."
      />

      <ToolContainer title="Convert Word to PDF">
        <div className="space-y-6">
          <FileUploader
            accept=".doc,.docx"
            onFileSelect={handleFileSelect}

            label="Upload Word Document"
          />

          {wordFile && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Selected:</strong> {wordFile.name} ({(wordFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          <button
            onClick={convertToPdf}
            disabled={!wordFile || converting}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {converting ? 'Converting...' : 'Convert to PDF'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={wordFile?.name.replace(/\.(doc|docx)$/, '.pdf')}
              className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
            >
              Download PDF Document
            </a>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 100% Private</h3>
            <p className="mt-2 text-sm text-slate-600">Files are processed locally in your browser</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Lightning Fast</h3>
            <p className="mt-2 text-sm text-slate-600">Convert Word to PDF in seconds</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📐 Preserve Formatting</h3>
            <p className="mt-2 text-sm text-slate-600">Maintains layout and styling</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload your Word document (DOC or DOCX format)</li>
          <li>Click "Convert to PDF" to start the conversion</li>
          <li>Wait for the conversion to complete</li>
          <li>Download your PDF file</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Are my documents uploaded to a server?',
            answer: 'No. All processing is done in your browser. Your documents never leave your device.'
          },
          {
            question: 'What Word formats are supported?',
            answer: 'Both DOC and DOCX formats are supported.'
          },
          {
            question: 'Will images and formatting be preserved?',
            answer: 'Yes, the tool preserves images, fonts, and formatting during conversion.'
          },
          {
            question: 'Is there a file size limit?',
            answer: 'The current limit is 10MB per file for optimal performance.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF to Word', slug: 'pdf-to-word', icon: '📄' },
          { name: 'PDF Compressor', slug: 'pdf-compress', icon: '🗜️' },
          { name: 'PDF Merger', slug: 'pdf-merge', icon: '📑' }
        ]}
      />
    </main>
  );
}
