# Migration Guide: PHP to Next.js

This guide documents the migration of ToolForFree from PHP to Next.js.

## Overview

The original PHP website has been migrated to Next.js with React components, maintaining the same URL structure and functionality.

## Key Changes

### 1. Routing

**PHP (old):**
- Files: `/r/word-counter/index.php`
- URL: `/r/word-counter/`

**Next.js (new):**
- Files: `/src/app/r/word-counter/page.tsx`
- URL: `/r/word-counter` (same, Next.js handles trailing slashes)

### 2. Header & Footer

**PHP (old):**
```php
<?php include $_SERVER['DOCUMENT_ROOT']."/includes/header.php"; ?>
<!-- page content -->
<?php include $_SERVER['DOCUMENT_ROOT']."/includes/footer.php"; ?>
```

**Next.js (new):**
- Header and Footer are components in `src/components/`
- Automatically included via `src/app/layout.tsx`
- No need to manually include them on each page

### 3. Dynamic Content

**PHP (old):**
```php
$pageTitle = "Word Counter – ToolForFree";
include "header.php";
```

**Next.js (new):**
```tsx
export const metadata: Metadata = {
  title: 'Word Counter – ToolForFree',
  description: '...',
};
```

### 4. Client-Side Interactivity

**PHP (old):**
```html
<script>
function generatePassword() {
  // JavaScript code
}
</script>
```

**Next.js (new):**
```tsx
'use client';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  
  const generatePassword = () => {
    // React state management
  };
}
```

### 5. API Routes

**PHP (old):**
- `/includes/tool-search.php` - Returns JSON

**Next.js (new):**
- `/src/app/api/tools/route.ts` - API Route handler
- URL: `/api/tools`

## Tool Migration Checklist

For each tool, follow these steps:

### Client-Side Tools (Simple)

Examples: Word Counter, Password Generator, Case Converter

1. Create directory: `src/app/r/[tool-name]/`
2. Create `page.tsx` with 'use client' directive
3. Convert HTML structure to JSX
4. Convert inline JS to React hooks (useState, useEffect)
5. Add metadata for SEO

### Server-Side Tools (Complex)

Examples: PDF Merge, Image Compressor

1. Create API route: `src/app/api/[tool-name]/route.ts`
2. Install necessary packages (e.g., `pdf-lib`)
3. Handle file upload with FormData
4. Process file server-side
5. Return processed file or result

## Static Assets

All static files from `/assets/` have been copied to `/public/assets/`:

- CSS: `/public/assets/css/style.css`
- Images: `/public/assets/images/`
- JavaScript: `/public/assets/js/`

In Next.js, reference as: `/assets/css/style.css` (omit `/public`)

## Migrating Remaining Tools

### Tools Already Migrated

✅ Word Counter
✅ Password Generator
✅ Age Calculator
✅ JSON Formatter

### Tools To Migrate

#### Text Tools (Client-Side - Easy)

1. **Case Converter**
   - Input/Output: Text
   - Logic: String manipulation
   - Effort: 15-30 minutes

2. **Remove Extra Spaces**
   - Input/Output: Text
   - Logic: Regex replacement
   - Effort: 15-30 minutes

3. **Base64 Encoder/Decoder**
   - Input/Output: Text
   - Logic: atob/btoa functions
   - Effort: 30 minutes

#### PDF Tools (Server-Side - Complex)

1. **PDF Merge**
   - Install: `npm install pdf-lib`
   - Create API route
   - Handle multiple file uploads
   - Merge PDFs server-side
   - Effort: 2-4 hours

2. **PDF Split**
   - Similar to PDF Merge
   - Split by page range
   - Effort: 2-3 hours

3. **PDF Compress**
   - May need additional compression library
   - Effort: 3-4 hours

4. **PDF to JPG / JPG to PDF**
   - Install: `pdf-lib` + `pdfjs-dist`
   - Canvas API for conversion
   - Effort: 3-5 hours

#### Image Tools (Mixed)

1. **Image Compressor**
   - Install: `browser-image-compression`
   - Client-side processing with Canvas API
   - Effort: 2-3 hours

2. **Image Resizer**
   - Canvas API
   - Client-side processing
   - Effort: 2-3 hours

3. **Background Remover**
   - Complex: May need ML model or API
   - Consider using remove.bg API or similar
   - Effort: 4-6 hours

## Tips for Migration

### 1. Keep URL Structure

Maintain the same URLs to preserve SEO:
- Old: `/r/tool-name/`
- New: `/r/tool-name`

### 2. Use TypeScript

TypeScript provides better type safety:
```tsx
interface ToolStats {
  words: number;
  characters: number;
}
```

### 3. Leverage React Hooks

- `useState` for component state
- `useEffect` for side effects
- `useRef` for DOM references

### 4. Error Handling

Always handle errors gracefully:
```tsx
try {
  const result = JSON.parse(input);
  setOutput(result);
} catch (error) {
  setError('Invalid JSON');
}
```

### 5. Client vs Server Components

- Use 'use client' for interactive components
- Keep default (server) for static pages
- API routes for backend processing

## Testing

Before deploying, test:

1. ✅ Homepage loads correctly
2. ✅ Tools listing shows all tools
3. ✅ Individual tools function properly
4. ✅ Search works
5. ✅ Theme toggle (dark/light mode)
6. ✅ Mobile responsiveness
7. ✅ Static pages (about, contact, etc.)

## Deployment

### Local Testing

```bash
npm run dev    # Development server
npm run build  # Production build
npm start      # Production server
```

### Production Deployment

1. **Vercel** (Recommended)
   - Connect GitHub repository
   - Auto-deploy on push

2. **Custom Server**
   - Run `npm run build`
   - Deploy `.next` folder
   - Requires Node.js environment

## Helpful Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [pdf-lib Documentation](https://pdf-lib.js.org/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Questions?

If you encounter issues during migration, check:
1. Console for JavaScript errors
2. Network tab for failed requests
3. Next.js build output for warnings
4. TypeScript errors (run `npm run build`)
