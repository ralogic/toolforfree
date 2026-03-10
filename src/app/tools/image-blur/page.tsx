'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function ImageBlurPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [blurAmount, setBlurAmount] = useState(5);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    setDownloadUrl(null);
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const applyBlur = async () => {
    if (!imageFile) return;

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
          // Apply blur filter
          ctx.filter = `blur(${blurAmount}px)`;
          ctx.drawImage(img, 0, 0);
          
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
      console.error('Blur error:', error);
      setProcessing(false);
      alert('Error applying blur');
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🌫️"
        title="Image Blur"
        description="Apply blur effect to your images. Perfect for creating backgrounds, privacy protection, or artistic effects."
      />

      <ToolContainer title="Blur Image">
        <div className="space-y-6">
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <FileUploader
            accept="image/*"
            onFileSelect={handleFileSelect}
            maxSize={10}
            label="Upload Image"
          />

          {previewUrl && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-64 rounded-lg"
              />
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <label htmlFor="blur" className="block text-sm font-semibold text-slate-900 mb-2">
              Blur Amount: {blurAmount}px
            </label>
            <input
              type="range"
              id="blur"
              min="1"
              max="20"
              value={blurAmount}
              onChange={(e) => setBlurAmount(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="mt-2 text-xs text-slate-500">
              Adjust the blur intensity (1-20 pixels)
            </p>
          </div>

          <button
            onClick={applyBlur}
            disabled={!imageFile || processing}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Applying Blur...' : 'Apply Blur'}
          </button>

          {downloadUrl && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <img src={downloadUrl} alt="Blurred" className="mx-auto max-h-96 rounded-lg" />
              </div>
              <a
                href={downloadUrl}
                download={`blurred-${imageFile?.name}`}
                className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
              >
                Download Blurred Image
              </a>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎨 Adjustable Blur</h3>
            <p className="mt-2 text-sm text-slate-600">Control blur intensity</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant Preview</h3>
            <p className="mt-2 text-sm text-slate-600">See results immediately</p>
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
          <li>Adjust blur amount using the slider</li>
          <li>Click "Apply Blur"</li>
          <li>Preview the result</li>
          <li>Download your blurred image</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What are common uses for blurred images?',
            answer: 'Blurred images are great for backgrounds, privacy protection (hiding faces/text), artistic effects, and creating depth in designs.'
          },
          {
            question: 'Can I blur specific areas only?',
            answer: 'Currently, the blur is applied to the entire image. For selective blur, crop the area first or use advanced image editors.'
          },
          {
            question: 'Does blurring reduce file size?',
            answer: 'Blur doesnt significantly affect file size. Use the Image Compressor tool to reduce file size.'
          },
          {
            question: 'Is my image uploaded to a server?',
            answer: 'No, all processing happens in your browser for complete privacy.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Cropper', slug: 'image-cropper', icon: '✂️' },
          { name: 'Image Resizer', slug: 'image-resizer', icon: '📐' }
        ]}
      />
    </main>
  );
}
