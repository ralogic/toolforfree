'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, X, File } from 'lucide-react';

interface FileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FileDropZone({
  onFilesSelected,
  accept,
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  disabled = false,
  className = '',
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const validateFiles = (files: File[]): { valid: File[]; error: string | null } => {
    setError('');
    
    // Check file count
    if (files.length > maxFiles) {
      return {
        valid: [],
        error: `Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`,
      };
    }

    // Check file sizes
    const oversizedFile = files.find(file => file.size > maxSize);
    if (oversizedFile) {
      return {
        valid: [],
        error: `File "${oversizedFile.name}" exceeds maximum size of ${formatFileSize(maxSize)}`,
      };
    }

    // Check file types if accept is specified
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const invalidFile = files.find(file => {
        return !acceptedTypes.some(acceptedType => {
          if (acceptedType.startsWith('.')) {
            return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
          }
          if (acceptedType.includes('*')) {
            const mimeBase = acceptedType.split('/')[0];
            return file.type.startsWith(mimeBase);
          }
          return file.type === acceptedType;
        });
      });

      if (invalidFile) {
        return {
          valid: [],
          error: `File type not accepted. Accepted: ${accept}`,
        };
      }
    }

    return { valid: files, error: null };
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const { valid, error } = validateFiles(fileArray);

    if (error) {
      setError(error);
      return;
    }

    setSelectedFiles(valid);
    onFilesSelected(valid);
    setError('');
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(false);
    dragCounter.current = 0;

    if (disabled) return;

    const files = e.dataTransfer.files;
    handleFiles(files);
  }, [disabled]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    onFilesSelected(updated);
    setError('');
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    onFilesSelected([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
            : error
            ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
            : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-blue-900/10'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <Upload className={`mx-auto h-12 w-12 ${
          isDragging ? 'text-blue-500' : error ? 'text-red-400' : 'text-slate-400'
        }`} />
        
        <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
          {isDragging
            ? 'Drop files here'
            : 'Drag & drop files here, or click to select'}
        </p>
        
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {accept && `Accepted: ${accept}`}
          {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
          {maxFiles > 1 && ` • Max ${maxFiles} files`}
        </p>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Selected Files ({selectedFiles.length})
            </p>
            <button
              onClick={clearFiles}
              className="text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
            >
              Clear all
            </button>
          </div>
          
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-slate-400" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="rounded-lg p-1 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4 text-slate-400 hover:text-red-600 dark:hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
