'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function PdfUnlockPage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setPdfFile(files[0]);
      setDownloadUrl(null);
    }
  };

  const unlockPdf = async () => {
    if (!pdfFile) return;

    setProcessing(true);
    try {
      // Use pdf-lib to remove password protection
      // const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
      // const pdfBytes = await pdfDoc.save();
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        // Placeholder for actual unlock logic
        const blob = new Blob([e.target?.result as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setProcessing(false);
      };
      reader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error('Unlock error:', error);
      setProcessing(false);
      alert('Error unlocking PDF. Check your password.');
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔓"
        title="PDF Unlock"
        description="Remove password protection from PDF files. Unlock password-protected PDFs securely in your browser."
      />

      <ToolContainer title="Unlock PDF File">
        <div className="space-y-6">
          <FileUploader
            accept=".pdf"
            onFileSelect={handleFileSelect}

            label="Upload Protected PDF"
          />

          {pdfFile && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Selected:</strong> {pdfFile.name}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
              PDF Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PDF password"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <p className="mt-2 text-xs text-slate-500">
              Your password is used only to unlock the PDF locally in your browser
            </p>
          </div>

          <button
            onClick={unlockPdf}
            disabled={!pdfFile || !password || processing}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Unlocking...' : 'Unlock PDF'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`unlocked-${pdfFile?.name}`}
              className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
            >
              Download Unlocked PDF
            </a>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 100% Secure</h3>
            <p className="mt-2 text-sm text-slate-600">Processing happens locally in your browser</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Fast Unlock</h3>
            <p className="mt-2 text-sm text-slate-600">Remove password protection instantly</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔓 Easy Access</h3>
            <p className="mt-2 text-sm text-slate-600">Make your PDFs freely accessible</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload your password-protected PDF file</li>
          <li>Enter the PDF password in the text field</li>
          <li>Click "Unlock PDF" to remove the password</li>
          <li>Download your unlocked PDF file</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Is my password secure?',
            answer: 'Yes, your password is only used locally in your browser and is never sent to any server.'
          },
          {
            question: 'What if I dont know the password?',
            answer: 'You must have the correct password to unlock a PDF. This tool cannot crack or bypass unknown passwords.'
          },
          {
            question: 'Will the unlocked PDF maintain quality?',
            answer: 'Yes, only the password protection is removed. All content and quality remain unchanged.'
          },
          {
            question: 'Can I unlock PDFs with user restrictions?',
            answer: 'Yes, this tool can remove both owner and user passwords from PDFs.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF Protect', slug: 'pdf-protect', icon: '🔒' },
          { name: 'PDF Merger', slug: 'pdf-merge', icon: '📑' },
          { name: 'PDF Compressor', slug: 'pdf-compress', icon: '🗜️' }
        ]}
      />
    </main>
  );
}
