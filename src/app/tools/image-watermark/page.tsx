'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function ImageWatermarkPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [opacity, setOpacity] = useState(0.5);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    setDownloadUrl(null);
  };

  const addWatermark = async () => {
    if (!imageFile || !watermarkText) return;

    setProcessing(true);
    try {
      const img = new Image();
      const url = URL.createObjectURL(imageFile);
      
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw original image
          ctx.drawImage(img, 0, 0);
          
          // Add watermark
          ctx.globalAlpha = opacity;
          ctx.font = `${img.width / 20}px Arial`;
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Draw watermark in center
          const x = img.width / 2;
          const y = img.height / 2;
          ctx.strokeText(watermarkText, x, y);
          ctx.fillText(watermarkText, x, y);
          
          // Convert to blob
          canvas.toBlob((blob) => {
            if (blob) {
              const newUrl = URL.createObjectURL(blob);
              setDownloadUrl(newUrl);
              setProcessing(false);
            }
          }, imageFile.type);
        }
      };
      
      img.src = url;
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
        title="Image Watermark"
        description="Add custom text watermarks to your images. Protect and brand your photos easily in your browser."
      />

      <ToolContainer title="Add Watermark to Image">
        <div className="space-y-6">
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <FileUploader
            accept="image/*"
            onFileSelect={handleFileSelect}
            maxSize={10}
            label="Upload Image"
          />

          {imageFile && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Selected:</strong> {imageFile.name}
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
            </div>
          </div>

          <button
            onClick={addWatermark}
            disabled={!imageFile || !watermarkText || processing}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Adding Watermark...' : 'Add Watermark'}
          </button>

          {downloadUrl && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <img src={downloadUrl} alt="Watermarked" className="mx-auto max-h-96 rounded-lg" />
              </div>
              <a
                href={downloadUrl}
                download={`watermarked-${imageFile?.name}`}
                className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
              >
                Download Watermarked Image
              </a>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">💧 Custom Text</h3>
            <p className="mt-2 text-sm text-slate-600">Add any text watermark</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎨 Adjustable</h3>
            <p className="mt-2 text-sm text-slate-600">Control opacity</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 Private</h3>
            <p className="mt-2 text-sm text-slate-600">No upload required</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload your image</li>
          <li>Enter watermark text</li>
          <li>Adjust opacity</li>
          <li>Click "Add Watermark"</li>
          <li>Download watermarked image</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Can I customize watermark position?',
            answer: 'Currently, the watermark is centered. More customization options may be added in future updates.'
          },
          {
            question: 'Does this reduce image quality?',
            answer: 'The tool maintains high quality, though some compression may occur depending on the original format.'
          },
          {
            question: 'Is my image uploaded to a server?',
            answer: 'No, all processing happens in your browser for complete privacy.'
          },
          {
            question: 'Can I remove the watermark later?',
            answer: 'Once added, watermarks become part of the image and cannot be easily removed. Keep your original file.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF Watermark', slug: 'pdf-watermark', icon: '💧' },
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Format Converter', slug: 'image-converter', icon: '🔄' }
        ]}
      />
    </main>
  );
}
