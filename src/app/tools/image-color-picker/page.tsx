'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function ImageColorPickerPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedColor(null);
    setColorHistory([]);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Scale coordinates to actual image size
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;
    const actualX = Math.floor(x * scaleX);
    const actualY = Math.floor(y * scaleY);

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const pixel = ctx.getImageData(actualX, actualY, 1, 1).data;
      const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
      const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      
      setSelectedColor(hex);
      if (!colorHistory.includes(hex)) {
        setColorHistory([hex, ...colorHistory].slice(0, 10));
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard!`);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🎨"
        title="Image Color Picker"
        description="Pick colors from any image and get HEX and RGB values. Perfect for designers and developers."
      />

      <ToolContainer title="Pick Colors from Image">
        <div className="space-y-6">
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <FileUploader
            accept="image/*"
            onFileSelect={handleFileSelect}
            maxSize={10}
            label="Upload Image"
          />

          {previewUrl && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600 mb-3 text-center">
                  Click on the image to pick a color
                </p>
                <img
                  ref={imgRef}
                  src={previewUrl}
                  alt="Preview"
                  onClick={handleImageClick}
                  className="mx-auto max-h-96 rounded-lg cursor-crosshair"
                />
              </div>

              {selectedColor && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Selected Color</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-24 h-24 rounded-xl border-2 border-slate-300 shadow-sm"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 w-12">HEX:</span>
                        <code className="flex-1 rounded bg-slate-100 px-3 py-2 text-sm font-mono">
                          {selectedColor}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedColor)}
                          className="px-3 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 w-12">RGB:</span>
                        <code className="flex-1 rounded bg-slate-100 px-3 py-2 text-sm font-mono">
                          {selectedColor && `rgb(${parseInt(selectedColor.slice(1, 3), 16)}, ${parseInt(selectedColor.slice(3, 5), 16)}, ${parseInt(selectedColor.slice(5, 7), 16)})`}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {colorHistory.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Color History</h3>
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {colorHistory.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => copyToClipboard(color)}
                        className="aspect-square rounded-lg border-2 border-slate-300 shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎨 Precise Picking</h3>
            <p className="mt-2 text-sm text-slate-600">Click any pixel to get its color</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Multiple Formats</h3>
            <p className="mt-2 text-sm text-slate-600">Get HEX and RGB values</p>
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
          <li>Click anywhere on the image to pick a color</li>
          <li>View HEX and RGB values</li>
          <li>Click "Copy" to copy the color value</li>
          <li>View previously picked colors in the history</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What color formats are supported?',
            answer: 'The tool displays both HEX (e.g., #FF5733) and RGB (e.g., rgb(255, 87, 51)) formats.'
          },
          {
            question: 'Can I pick multiple colors?',
            answer: 'Yes, you can pick as many colors as you want. The last 10 colors are shown in the history.'
          },
          {
            question: 'Is my image uploaded to a server?',
            answer: 'No, all processing happens in your browser. Your images never leave your device.'
          },
          {
            question: 'What can I use this for?',
            answer: 'Perfect for web design, graphic design, creating color palettes, matching brand colors, and more.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Metadata Viewer', slug: 'image-metadata-viewer', icon: '📋' },
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Format Converter', slug: 'image-converter', icon: '🔄' }
        ]}
      />
    </main>
  );
}
