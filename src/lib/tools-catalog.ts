// Tools catalog with metadata for navigation
export interface ToolItem {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  category: string;
  keywords: string[];
}

interface ToolsCatalog {
  textTools: ToolItem[];
  developerTools: ToolItem[];
  utilityTools: ToolItem[];
  pdfTools: ToolItem[];
  imageTools: ToolItem[];
  allTools: ToolItem[];
}

export const TOOLS_CATALOG: ToolsCatalog = {
  textTools: [
    {
      id: 11,
      name: 'Word Counter',
      slug: 'word-counter',
      icon: '📝',
      description: 'Count words, characters, lines, and paragraphs in your text with real-time statistics.',
      category: 'Text Tools',
      keywords: ['word count', 'character count', 'statistics', 'text analysis']
    },
    {
      id: 12,
      name: 'Case Converter',
      slug: 'case-converter',
      icon: '🔤',
      description: 'Convert text between uppercase, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
      category: 'Text Tools',
      keywords: ['case conversion', 'text formatter', 'uppercase', 'lowercase']
    },
    {
      id: 13,
      name: 'Remove Duplicate Lines',
      slug: 'remove-duplicate-lines',
      icon: '🗑️',
      description: 'Remove duplicate lines from text while preserving the original order of unique entries.',
      category: 'Text Tools',
      keywords: ['deduplicate', 'unique lines', 'text cleanup']
    },
    {
      id: 14,
      name: 'Text Sorter',
      slug: 'text-sorter',
      icon: '🔀',
      description: 'Sort text lines alphabetically in ascending or descending order instantly.',
      category: 'Text Tools',
      keywords: ['sort', 'alphabetical order', 'list sorting']
    },
    {
      id: 15,
      name: 'Lorem Ipsum Generator',
      slug: 'lorem-ipsum-generator',
      icon: '📄',
      description: 'Generate placeholder Lorem Ipsum text for design mockups and prototypes.',
      category: 'Text Tools',
      keywords: ['placeholder text', 'lorem ipsum', 'dummy text']
    }
  ],
  developerTools: [
    {
      id: 16,
      name: 'JSON Formatter',
      slug: 'json-formatter',
      icon: '{ }',
      description: 'Format, validate, and minify JSON code with proper indentation and error detection.',
      category: 'Developer Tools',
      keywords: ['json', 'formatter', 'validator', 'minify']
    },
    {
      id: 17,
      name: 'Base64 Encoder / Decoder',
      slug: 'base64-encoder-decoder',
      icon: '🔐',
      description: 'Encode text to Base64 and decode Base64 strings instantly for data transmission.',
      category: 'Developer Tools',
      keywords: ['base64', 'encoding', 'decoding', 'data format']
    },
    {
      id: 18,
      name: 'URL Encoder / Decoder',
      slug: 'url-encoder-decoder',
      icon: '🌐',
      description: 'Encode and decode URL-safe strings for query parameters and form data.',
      category: 'Developer Tools',
      keywords: ['url', 'encoding', 'query parameters', 'web development']
    },
    {
      id: 19,
      name: 'JWT Decoder',
      slug: 'jwt-decoder',
      icon: '🔑',
      description: 'Decode JWT tokens to view claims and payload for authentication debugging.',
      category: 'Developer Tools',
      keywords: ['jwt', 'token', 'authentication', 'decoding']
    },
    {
      id: 20,
      name: 'Regex Tester',
      slug: 'regex-tester',
      icon: '🔍',
      description: 'Test and debug regular expressions with real-time matching and pattern validation.',
      category: 'Developer Tools',
      keywords: ['regex', 'regular expression', 'pattern matching', 'validation']
    }
  ],
  utilityTools: [
    {
      id: 21,
      name: 'QR Code Generator',
      slug: 'qr-code-generator',
      icon: '📱',
      description: 'Generate QR codes from URLs and text instantly. Perfect for marketing and sharing.',
      category: 'Utility Tools',
      keywords: ['qr', 'barcode', 'url', 'sharing']
    },
    {
      id: 22,
      name: 'Password Generator',
      slug: 'password-generator',
      icon: '🔐',
      description: 'Generate strong, random passwords with customizable length and character types.',
      category: 'Utility Tools',
      keywords: ['password', 'security', 'random', 'generator']
    },
    {
      id: 23,
      name: 'UUID Generator',
      slug: 'uuid-generator',
      icon: '🔢',
      description: 'Generate unique identifiers (UUIDs) for databases, APIs, and applications.',
      category: 'Utility Tools',
      keywords: ['uuid', 'identifier', 'unique', 'database']
    },
    {
      id: 24,
      name: 'Timestamp Converter',
      slug: 'timestamp-converter',
      icon: '🕐',
      description: 'Convert between Unix timestamps and readable dates instantly.',
      category: 'Utility Tools',
      keywords: ['timestamp', 'date', 'unix', 'converter']
    },
    {
      id: 25,
      name: 'Age Calculator',
      slug: 'age-calculator',
      icon: '🎂',
      description: 'Calculate exact age in years, months, and days. Find out how many days you\'ve lived.',
      category: 'Utility Tools',
      keywords: ['age', 'calculator', 'date', 'birthday']
    }
  ],
  pdfTools: [
    {
      id: 1,
      name: 'PDF Merger',
      slug: 'pdf-merge',
      icon: '📄',
      description: 'Combine multiple PDF files into a single document with ease.',
      category: 'PDF Tools',
      keywords: ['pdf', 'merge', 'combine', 'documents']
    },
    {
      id: 2,
      name: 'PDF Splitter',
      slug: 'pdf-split',
      icon: '✂️',
      description: 'Extract specific pages from PDF and create a custom PDF file.',
      category: 'PDF Tools',
      keywords: ['pdf', 'split', 'extract', 'pages']
    },
    {
      id: 3,
      name: 'PDF Compressor',
      slug: 'pdf-compress',
      icon: '🗜️',
      description: 'Reduce PDF file size while maintaining quality for easier sharing.',
      category: 'PDF Tools',
      keywords: ['pdf', 'compress', 'optimization', 'file size']
    },
    {
      id: 4,
      name: 'PDF to Image Converter',
      slug: 'pdf-to-image',
      icon: '🖼️',
      description: 'Convert PDF pages to PNG or JPG images with high resolution.',
      category: 'PDF Tools',
      keywords: ['pdf', 'image', 'convert', 'png', 'jpg']
    },
    {
      id: 5,
      name: 'Image to PDF Converter',
      slug: 'image-to-pdf',
      icon: '📄',
      description: 'Convert multiple images into a single PDF file.',
      category: 'PDF Tools',
      keywords: ['image', 'pdf', 'convert', 'combine']
    }
  ],
  imageTools: [
    {
      id: 6,
      name: 'Image Compressor',
      slug: 'image-compressor',
      icon: '📸',
      description: 'Reduce image file size without losing quality for web optimization.',
      category: 'Image Tools',
      keywords: ['image', 'compress', 'optimization', 'quality']
    },
    {
      id: 7,
      name: 'Image Resizer',
      slug: 'image-resizer',
      icon: '📐',
      description: 'Resize images to specific dimensions with aspect ratio control.',
      category: 'Image Tools',
      keywords: ['image', 'resize', 'dimensions', 'scale']
    },
    {
      id: 8,
      name: 'Image Format Converter',
      slug: 'image-converter',
      icon: '🔄',
      description: 'Convert images between PNG, JPG, and WebP formats instantly.',
      category: 'Image Tools',
      keywords: ['image', 'convert', 'format', 'png', 'jpg', 'webp']
    },
    {
      id: 9,
      name: 'Image Cropper',
      slug: 'image-cropper',
      icon: '✂️',
      description: 'Crop images to exact dimensions for thumbnails and profile pictures.',
      category: 'Image Tools',
      keywords: ['image', 'crop', 'trim', 'thumbnail']
    },
    {
      id: 10,
      name: 'Background Remover',
      slug: 'background-remover',
      icon: '✨',
      description: 'Remove image backgrounds automatically with AI-powered recommendations.',
      category: 'Image Tools',
      keywords: ['image', 'background', 'remove', 'ai']
    }
  ],
  allTools: []
};

// Populate allTools with all tools
TOOLS_CATALOG.allTools = [
  ...TOOLS_CATALOG.pdfTools,
  ...TOOLS_CATALOG.imageTools,
  ...TOOLS_CATALOG.textTools,
  ...TOOLS_CATALOG.developerTools,
  ...TOOLS_CATALOG.utilityTools
];

// Export for easy access
export const getAllTools = () => TOOLS_CATALOG.allTools;
export const getToolBySlug = (slug: string) => 
  TOOLS_CATALOG.allTools.find(tool => tool.slug === slug);

export const getRelatedTools = (toolSlug: string, limit: number = 3) => {
  const currentTool = getToolBySlug(toolSlug);
  if (!currentTool) return [];
  
  return TOOLS_CATALOG.allTools
    .filter(tool => 
      tool.slug !== toolSlug && 
      tool.category === currentTool.category
    )
    .slice(0, limit);
};

export const getToolsByCategory = (category: string) =>
  TOOLS_CATALOG.allTools.filter(tool => tool.category === category);

export const searchTools = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return TOOLS_CATALOG.allTools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.keywords.some((keyword) => keyword.includes(lowerQuery))
  );
};
