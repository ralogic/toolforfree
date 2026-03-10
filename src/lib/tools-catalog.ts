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
  seoTools: ToolItem[];
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
    },
    {
      id: 26,
      name: 'Text Diff Checker',
      slug: 'text-diff-checker',
      icon: '🔄',
      description: 'Compare two texts side-by-side and highlight differences between them.',
      category: 'Text Tools',
      keywords: ['diff', 'compare', 'text comparison', 'difference']
    },
    {
      id: 27,
      name: 'Text Reverser',
      slug: 'text-reverser',
      icon: '↩️',
      description: 'Reverse text, words, or lines instantly. Fun and useful for creative purposes.',
      category: 'Text Tools',
      keywords: ['reverse', 'flip', 'backwards text', 'mirror']
    },
    {
      id: 28,
      name: 'Extra Space Remover',
      slug: 'extra-space-remover',
      icon: '🧹',
      description: 'Remove extra spaces, leading/trailing spaces, and clean up text formatting.',
      category: 'Text Tools',
      keywords: ['whitespace', 'cleanup', 'trim', 'formatting']
    },
    {
      id: 29,
      name: 'Slug Generator',
      slug: 'slug-generator',
      icon: '🔗',
      description: 'Convert text into SEO-friendly URL slugs for web development.',
      category: 'Text Tools',
      keywords: ['slug', 'url', 'seo', 'web development']
    },
    {
      id: 30,
      name: 'Random Text Generator',
      slug: 'random-text-generator',
      icon: '🎲',
      description: 'Generate random words, sentences, or paragraphs for testing and mockups.',
      category: 'Text Tools',
      keywords: ['random', 'generator', 'placeholder', 'testing']
    },
    {
      id: 31,
      name: 'Character Counter',
      slug: 'character-counter',
      icon: '🔤',
      description: 'Count characters, words, and lines with detailed statistics including spaces.',
      category: 'Text Tools',
      keywords: ['character', 'count', 'length', 'statistics']
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
    },
    {
      id: 32,
      name: 'HTML Formatter',
      slug: 'html-formatter',
      icon: '🌐',
      description: 'Format and beautify HTML code with proper indentation for better readability.',
      category: 'Developer Tools',
      keywords: ['html', 'formatter', 'beautify', 'code']
    },
    {
      id: 33,
      name: 'CSS Minifier',
      slug: 'css-minifier',
      icon: '🎨',
      description: 'Minify CSS code by removing whitespace and comments to reduce file size.',
      category: 'Developer Tools',
      keywords: ['css', 'minify', 'compress', 'optimization']
    },
    {
      id: 34,
      name: 'JavaScript Minifier',
      slug: 'js-minifier',
      icon: '⚡',
      description: 'Minify JavaScript code to reduce file size and improve load times.',
      category: 'Developer Tools',
      keywords: ['javascript', 'minify', 'compress', 'optimization']
    },
    {
      id: 35,
      name: 'JavaScript Beautifier',
      slug: 'js-beautifier',
      icon: '✨',
      description: 'Format and beautify JavaScript code with proper indentation and structure.',
      category: 'Developer Tools',
      keywords: ['javascript', 'beautify', 'formatter', 'code']
    },
    {
      id: 36,
      name: 'SQL Formatter',
      slug: 'sql-formatter',
      icon: '🗄️',
      description: 'Format SQL queries with proper indentation for better readability.',
      category: 'Developer Tools',
      keywords: ['sql', 'formatter', 'database', 'query']
    },
    {
      id: 37,
      name: 'XML Formatter',
      slug: 'xml-formatter',
      icon: '📋',
      description: 'Format XML documents with proper indentation and structure.',
      category: 'Developer Tools',
      keywords: ['xml', 'formatter', 'beautify', 'markup']
    },
    {
      id: 38,
      name: 'Markdown to HTML',
      slug: 'markdown-to-html',
      icon: '📝',
      description: 'Convert Markdown text to HTML code instantly for web publishing.',
      category: 'Developer Tools',
      keywords: ['markdown', 'html', 'convert', 'documentation']
    },
    {
      id: 39,
      name: 'HTML to Markdown',
      slug: 'html-to-markdown',
      icon: '📄',
      description: 'Convert HTML code to Markdown format for documentation and notes.',
      category: 'Developer Tools',
      keywords: ['html', 'markdown', 'convert', 'documentation']
    },
    {
      id: 40,
      name: 'Hash Generator',
      slug: 'hash-generator',
      icon: '🔐',
      description: 'Generate MD5, SHA-1, SHA-256 hashes for passwords and data integrity.',
      category: 'Developer Tools',
      keywords: ['hash', 'md5', 'sha256', 'encryption', 'security']
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
    },
    {
      id: 41,
      name: 'Percentage Calculator',
      slug: 'percentage-calculator',
      icon: '📊',
      description: 'Calculate percentages, percentage change, and reverse percentage calculations.',
      category: 'Utility Tools',
      keywords: ['percentage', 'calculator', 'math', 'percentage change']
    },
    {
      id: 42,
      name: 'EMI Calculator',
      slug: 'emi-calculator',
      icon: '💰',
      description: 'Calculate loan EMI with detailed breakdown of principal and interest payments.',
      category: 'Utility Tools',
      keywords: ['emi', 'loan', 'calculator', 'finance', 'interest']
    },
    {
      id: 43,
      name: 'GST Calculator',
      slug: 'gst-calculator',
      icon: '🧾',
      description: 'Add or remove GST from amounts with automatic CGST/SGST breakdown.',
      category: 'Utility Tools',
      keywords: ['gst', 'tax', 'calculator', 'cgst', 'sgst']
    },
    {
      id: 44,
      name: 'Unit Converter',
      slug: 'unit-converter',
      icon: '📏',
      description: 'Convert between length, weight, temperature, volume, and area units.',
      category: 'Utility Tools',
      keywords: ['unit', 'converter', 'measurement', 'length', 'weight']
    },
    {
      id: 45,
      name: 'Binary Converter',
      slug: 'binary-converter',
      icon: '🔢',
      description: 'Convert between binary, decimal, and text for programming and education.',
      category: 'Utility Tools',
      keywords: ['binary', 'decimal', 'converter', 'programming', 'text']
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
    },
    {
      id: 46,
      name: 'PDF to Word Converter',
      slug: 'pdf-to-word',
      icon: '📝',
      description: 'Convert PDF files to editable Word documents for easy editing.',
      category: 'PDF Tools',
      keywords: ['pdf', 'word', 'docx', 'convert', 'editable']
    },
    {
      id: 47,
      name: 'Word to PDF Converter',
      slug: 'word-to-pdf',
      icon: '📄',
      description: 'Convert Word documents to PDF format for universal sharing.',
      category: 'PDF Tools',
      keywords: ['word', 'pdf', 'docx', 'convert', 'document']
    },
    {
      id: 48,
      name: 'PDF Rotator',
      slug: 'pdf-rotate',
      icon: '🔄',
      description: 'Rotate PDF pages by 90, 180, or 270 degrees clockwise or counterclockwise.',
      category: 'PDF Tools',
      keywords: ['pdf', 'rotate', 'orientation', 'pages']
    },
    {
      id: 49,
      name: 'PDF Unlocker',
      slug: 'pdf-unlock',
      icon: '🔓',
      description: 'Remove password protection from PDF files for easy access.',
      category: 'PDF Tools',
      keywords: ['pdf', 'unlock', 'password', 'security', 'remove']
    },
    {
      id: 50,
      name: 'PDF Password Protector',
      slug: 'pdf-protect',
      icon: '🔒',
      description: 'Add password protection to PDF files to secure sensitive documents.',
      category: 'PDF Tools',
      keywords: ['pdf', 'protect', 'password', 'security', 'encrypt']
    },
    {
      id: 51,
      name: 'PDF Watermark',
      slug: 'pdf-watermark',
      icon: '💧',
      description: 'Add text watermarks to PDF files for branding and copyright protection.',
      category: 'PDF Tools',
      keywords: ['pdf', 'watermark', 'branding', 'copyright', 'text']
    },
    {
      id: 52,
      name: 'PDF Page Remover',
      slug: 'pdf-page-remover',
      icon: '🗑️',
      description: 'Remove unwanted pages from PDF files and create a cleaned document.',
      category: 'PDF Tools',
      keywords: ['pdf', 'remove', 'delete', 'pages', 'cleanup']
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
    },
    {
      id: 53,
      name: 'Image Metadata Viewer',
      slug: 'image-metadata-viewer',
      icon: '📋',
      description: 'View detailed image metadata including EXIF data, dimensions, and file info.',
      category: 'Image Tools',
      keywords: ['image', 'metadata', 'exif', 'information', 'details']
    },
    {
      id: 54,
      name: 'Image EXIF Remover',
      slug: 'image-exif-remover',
      icon: '🔒',
      description: 'Remove EXIF metadata from images to protect privacy and reduce file size.',
      category: 'Image Tools',
      keywords: ['image', 'exif', 'metadata', 'privacy', 'remove']
    },
    {
      id: 55,
      name: 'Image Watermark',
      slug: 'image-watermark',
      icon: '💧',
      description: 'Add text or image watermarks to photos for copyright protection.',
      category: 'Image Tools',
      keywords: ['image', 'watermark', 'copyright', 'protection', 'branding']
    },
    {
      id: 56,
      name: 'Image Blur Tool',
      slug: 'image-blur',
      icon: '🌫️',
      description: 'Apply blur effects to images or specific areas for privacy protection.',
      category: 'Image Tools',
      keywords: ['image', 'blur', 'effect', 'privacy', 'filter']
    },
    {
      id: 57,
      name: 'Image Color Picker',
      slug: 'image-color-picker',
      icon: '🎨',
      description: 'Extract colors from images and get hex, RGB, and HSL color codes.',
      category: 'Image Tools',
      keywords: ['image', 'color', 'picker', 'hex', 'rgb', 'palette']
    }
  ],
  seoTools: [
    {
      id: 58,
      name: 'Meta Tag Generator',
      slug: 'meta-tag-generator',
      icon: '🏷️',
      description: 'Generate HTML meta tags for SEO optimization and social media sharing.',
      category: 'SEO Tools',
      keywords: ['meta tags', 'seo', 'html', 'optimization', 'keywords']
    },
    {
      id: 59,
      name: 'Open Graph Generator',
      slug: 'open-graph-generator',
      icon: '📱',
      description: 'Generate Open Graph tags for social media sharing on Facebook, Twitter, and LinkedIn.',
      category: 'SEO Tools',
      keywords: ['open graph', 'social media', 'facebook', 'twitter', 'meta tags']
    },
    {
      id: 60,
      name: 'Robots.txt Generator',
      slug: 'robots-txt-generator',
      icon: '🤖',
      description: 'Generate robots.txt file to control how search engines crawl your website.',
      category: 'SEO Tools',
      keywords: ['robots.txt', 'seo', 'crawling', 'search engines', 'sitemap']
    },
    {
      id: 61,
      name: 'XML Sitemap Generator',
      slug: 'sitemap-generator',
      icon: '🗺️',
      description: 'Generate XML sitemaps to help search engines discover and index your pages.',
      category: 'SEO Tools',
      keywords: ['sitemap', 'xml', 'seo', 'search engines', 'indexing']
    },
    {
      id: 62,
      name: 'Keyword Density Checker',
      slug: 'keyword-density-checker',
      icon: '🔍',
      description: 'Analyze keyword frequency and density in your content for better SEO.',
      category: 'SEO Tools',
      keywords: ['keyword density', 'seo', 'content analysis', 'frequency', 'optimization']
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
  ...TOOLS_CATALOG.utilityTools,
  ...TOOLS_CATALOG.seoTools
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
