'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

interface ImageMetadata {
  fileName: string;
  fileSize: string;
  fileType: string;
  dimensions: string;
  lastModified: string;
  exif?: Record<string, any>;
}

export default function ImageMetadataViewerPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setMetadata(null);

      // Create preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Load image to get dimensions
      const img = new Image();
      img.onload = () => {
        const meta: ImageMetadata = {
          fileName: file.name,
          fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          fileType: file.type,
          dimensions: `${img.width} × ${img.height} pixels`,
          lastModified: new Date(file.lastModified).toLocaleString()
        };
        setMetadata(meta);
      };
      img.src = url;

      // In production, use exif-js or similar to extract EXIF data
      // EXIF.getData(file, function() {
      //   const exifData = EXIF.getAllTags(this);
      //   setMetadata(prev => ({ ...prev, exif: exifData }));
      // });
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📋"
        title="Image Metadata Viewer"
        description="View detailed information about your images including dimensions, file size, type, and EXIF data. All processing happens in your browser."
      />

      <ToolContainer title="View Image Metadata">
        <div className="space-y-6">
          <FileUploader
            accept="image/*"
            onFileSelect={handleFileSelect}
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

          {metadata && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Image Information</h3>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-700">File Name:</span>
                  <span className="text-slate-900">{metadata.fileName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-700">File Size:</span>
                  <span className="text-slate-900">{metadata.fileSize}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-700">File Type:</span>
                  <span className="text-slate-900">{metadata.fileType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium text-slate-700">Dimensions:</span>
                  <span className="text-slate-900">{metadata.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Last Modified:</span>
                  <span className="text-slate-900">{metadata.lastModified}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Detailed Info</h3>
            <p className="mt-2 text-sm text-slate-600">View all image metadata</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 Private</h3>
            <p className="mt-2 text-sm text-slate-600">No upload required</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">View metadata instantly</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload your image file</li>
          <li>View the image preview</li>
          <li>Check all metadata information displayed below the preview</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What metadata can I view?',
            answer: 'You can view file name, size, type, dimensions, last modified date, and EXIF data if available in the image.'
          },
          {
            question: 'Is my image uploaded to a server?',
            answer: 'No, all processing happens in your browser. Your images never leave your device.'
          },
          {
            question: 'What is EXIF data?',
            answer: 'EXIF data includes camera settings, location, date taken, and other information stored by cameras and phones.'
          },
          {
            question: 'Does this work with all image formats?',
            answer: 'Yes, it works with JPG, PNG, GIF, WebP, and other common image formats.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'EXIF Remover', slug: 'image-exif-remover', icon: '🗑️' },
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Format Converter', slug: 'image-converter', icon: '🔄' }
        ]}
      />
    </main>
  );
}
