// File utilities
export const downloadFile = (content: string | Blob, filename: string) => {
  const blob = typeof content === 'string' ? new Blob([content], { type: 'text/plain' }) : content;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Text utilities
export const countWords = (text: string) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const countCharacters = (text: string, includeSpaces: boolean = true) => {
  return includeSpaces ? text.length : text.replace(/\s/g, '').length;
};

export const countLines = (text: string) => {
  return text.split('\n').filter(line => line.trim().length > 0).length;
};

// Case conversion
export const toUpperCase = (text: string) => text.toUpperCase();
export const toLowerCase = (text: string) => text.toLowerCase();
export const toTitleCase = (text: string) => {
  return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const toCamelCase = (text: string) => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => (idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()))
    .replace(/\s+/g, '');
};

export const toSnakeCase = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

export const toKebabCase = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

// Array/Line utilities
export const removeDuplicateLines = (text: string) => {
  const lines = text.split('\n');
  const unique = [...new Set(lines)];
  return unique.join('\n');
};

export const sortLines = (text: string, descending: boolean = false) => {
  const lines = text.split('\n');
  return lines.sort((a, b) => (descending ? b.localeCompare(a) : a.localeCompare(b))).join('\n');
};

// Base64
export const encodeBase64 = (text: string) => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    return '';
  }
};

export const decodeBase64 = (text: string) => {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch (error) {
    return '';
  }
};

// URL encoding
export const encodeURL = (text: string) => encodeURIComponent(text);
export const decodeURL = (text: string) => {
  try {
    return decodeURIComponent(text);
  } catch {
    return '';
  }
};

// JSON
export const formatJSON = (text: string, indent: number = 2) => {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    return '';
  }
};

export const minifyJSON = (text: string) => {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed);
  } catch (error) {
    return '';
  }
};

// JWT Decoder
export const decodeJWT = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT format');
    
    let payload = parts[1];
    payload += '='.repeat((4 - (payload.length % 4)) % 4);
    
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
};

// Timestamp conversion
export const timestampToDate = (timestamp: number | string) => {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  const isMs = ts > 9999999999;
  const date = new Date(isMs ? ts : ts * 1000);
  return date.toISOString();
};

export const dateToTimestamp = (dateString: string) => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

// Age calculator
export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// UUID Generator
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Password Generator
export const generatePassword = (
  length: number = 16,
  options: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  } = { uppercase: true, lowercase: true, numbers: true, symbols: true }
) => {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_-+=[]{}|;:,.<>?';

  let chars = '';
  if (options.uppercase) chars += upperCase;
  if (options.lowercase) chars += lowerCase;
  if (options.numbers) chars += numbers;
  if (options.symbols) chars += symbols;

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Lorem Ipsum
export const generateLoremIpsum = (paragraphs: number = 1) => {
  const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  
  let result = '';
  for (let i = 0; i < paragraphs; i++) {
    result += loremText + (i < paragraphs - 1 ? '\n\n' : '');
  }
  return result;
};

// Image utilities
export const resizeImage = (
  file: File,
  width: number,
  height: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(blob || new Blob());
        }, file.type);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const compressImage = (
  file: File,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          resolve(blob || new Blob());
        }, 'image/jpeg', quality);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const convertImageFormat = (
  file: File,
  format: 'jpeg' | 'png' | 'webp' = 'jpeg'
): Promise<Blob> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
        canvas.toBlob((blob) => {
          resolve(blob || new Blob());
        }, mimeType);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
