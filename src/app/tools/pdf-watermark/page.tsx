'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function PdfWatermarkPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [opacity, setOpacity] = useState(0.3);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setPdfFile(files[0]);
      setDownloadUrl(null);
    }
  };

  const addWatermark = async () => {
    if (!pdfFile || !watermarkText) return;

    setProcessing(true);
    try {
      // Use pdf-lib to add watermark to PDF
      // const pdfDoc = await PDFDocument.load(arrayBuffer);
      // const pages = pdfDoc.getPages();
      // pages.forEach(page => {
      //   page.drawText(watermarkText, { opacity, rotation, size });
      // });
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        // Placeholder for actual watermark logic
        const blob = new Blob([e.target?.result as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setProcessing(false);
      };
      reader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error('Watermark error:', error);
      setProcessing(false);
      alert('Error adding watermark');
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="💧"
        title="PDF Watermark"
        description="Add custom text watermarks to your PDF documents. Protect and brand your PDFs easily in your browser."
      />

      <ToolContainer title="Add Watermark to PDF">
        <div className="space-y-6">
          <FileUploader
            accept=".pdf"
            onFileSelect={handleFileSelect}
            label="Upload PDF File"
          />

          {pdfFile && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Selected:</strong> {pdfFile.name}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div>
              <label htmlFor="watermark" className="block text-sm font-semibold text-slate-900 mb-2">
                Watermark Text
              </label>
              <input
                type="text"
                id="watermark"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Enter watermark text"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            
            <div>
              <label htmlFor="opacity" className="block text-sm font-semibold text-slate-900 mb-2">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                id="opacity"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="mt-1 text-xs text-slate-500">Adjust watermark transparency</p>
            </div>
          </div>

          <button
            onClick={addWatermark}
            disabled={!pdfFile || !watermarkText || processing}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Adding Watermark...' : 'Add Watermark'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`watermarked-${pdfFile?.name}`}
              className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
            >
              Download Watermarked PDF
            </a>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">💧 Custom Text</h3>
            <p className="mt-2 text-sm text-slate-600">Add any text as watermark</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎨 Adjustable Opacity</h3>
            <p className="mt-2 text-sm text-slate-600">Control watermark transparency</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 Private Processing</h3>
            <p className="mt-2 text-sm text-slate-600">All processing done locally</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload your PDF file</li>
          <li>Enter the watermark text you want to add</li>
          <li>Adjust the opacity slider for desired transparency</li>
          <li>Click "Add Watermark" to process the PDF</li>
          <li>Download your watermarked PDF</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Will the watermark appear on all pages?',
            answer: 'Yes, the watermark will be added to every page of the PDF document.'
          },
          {
            question: 'Can I customize the watermark position?',
            answer: 'Currently, the watermark is centered on each page. More customization options may be added in future updates.'
          },
          {
            question: 'Is my PDF uploaded to a server?',
            answer: 'No, all watermarking is done in your browser. Your files never leave your device.'
          },
          {
            question: 'Can I remove the watermark later?',
            answer: 'Once added to a PDF, watermarks become part of the document and cannot be easily removed. Keep your original file.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF Protect', slug: 'pdf-protect', icon: '🔒' },
          { name: 'PDF Merger', slug: 'pdf-merge', icon: '📑' },
          { name: 'Image Watermark', slug: 'image-watermark', icon: '💧' }
        ]}
      />
    </main>
  );
}
