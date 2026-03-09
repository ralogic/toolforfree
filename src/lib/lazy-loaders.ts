/**
 * Lazy Loading Utilities for Heavy Libraries
 * 
 * Use these functions to dynamically import large libraries only when needed,
 * reducing initial bundle size and improving page load performance.
 */

/**
 * Lazy load pdf-lib for PDF manipulation
 * @returns Promise resolving to the pdf-lib module
 */
export async function loadPdfLib() {
  try {
    const pdfLib = await import('pdf-lib');
    return pdfLib;
  } catch (error) {
    console.error('Failed to load pdf-lib:', error);
    throw new Error('Failed to load PDF library. Please try again.');
  }
}

/**
 * Lazy load pdfjs-dist for PDF rendering
 * @returns Promise resolving to the pdfjs-dist module with worker configured
 */
export async function loadPdfJs() {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    
    // Configure worker - use CDN worker for simplicity
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    
    return pdfjsLib;
  } catch (error) {
    console.error('Failed to load pdfjs-dist:', error);
    throw new Error('Failed to load PDF viewer library. Please try again.');
  }
}

/**
 * Lazy load qrcode library for QR code generation
 * @returns Promise resolving to the qrcode module
 */
export async function loadQRCode() {
  try {
    const QRCode = await import('qrcode');
    return QRCode;
  } catch (error) {
    console.error('Failed to load qrcode:', error);
    throw new Error('Failed to load QR code library. Please try again.');
  }
}

/**
 * Lazy load jspdf for PDF generation
 * @returns Promise resolving to the jspdf module
 */
export async function loadJsPDF() {
  try {
    const { jsPDF } = await import('jspdf');
    return jsPDF;
  } catch (error) {
    console.error('Failed to load jspdf:', error);
    throw new Error('Failed to load PDF generation library. Please try again.');
  }
}

/**
 * Lazy load react-image-crop for image cropping
 * @returns Promise resolving to the react-image-crop module
 */
export async function loadImageCrop() {
  try {
    const ReactCrop = await import('react-image-crop');
    return ReactCrop;
  } catch (error) {
    console.error('Failed to load react-image-crop:', error);
    throw new Error('Failed to load image crop library. Please try again.');
  }
}

/**
 * Generic lazy loader with retry logic
 * @param loader - Function that returns a promise
 * @param maxRetries - Maximum number of retry attempts
 * @param retryDelay - Delay between retries in milliseconds
 * @returns Promise resolving to the loaded module
 */
export async function loadWithRetry<T>(
  loader: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await loader();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < maxRetries - 1) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  throw lastError || new Error('Failed to load library after multiple attempts');
}

/**
 * Preload a library in the background
 * @param loader - Function that returns a promise
 */
export function preloadLibrary<T>(loader: () => Promise<T>): void {
  // Start loading in background, but don't block
  loader().catch(error => {
    console.warn('Background preload failed:', error);
  });
}

/**
 * Create a cached loader that only loads the library once
 * @param loader - Function that returns a promise
 * @returns Cached loader function
 */
export function createCachedLoader<T>(loader: () => Promise<T>) {
  let cachedPromise: Promise<T> | null = null;
  
  return (): Promise<T> => {
    if (!cachedPromise) {
      cachedPromise = loader();
    }
    return cachedPromise;
  };
}

// Create cached versions of commonly used loaders
export const getPdfLib = createCachedLoader(loadPdfLib);
export const getPdfJs = createCachedLoader(loadPdfJs);
export const getQRCode = createCachedLoader(loadQRCode);
export const getJsPDF = createCachedLoader(loadJsPDF);
export const getImageCrop = createCachedLoader(loadImageCrop);
