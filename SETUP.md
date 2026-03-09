# 🚀 Quick Setup Guide

Welcome to ToolForFree! This guide will help you get started quickly.

## Prerequisites Checklist

- [ ] Node.js 20 or higher installed
- [ ] npm or yarn package manager
- [ ] Basic understanding of React and Next.js
- [ ] Text editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, and tool-specific libraries.

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Google Analytics (optional but recommended)
NEXT_PUBLIC_GA_ID=G-YOUR-GA-ID

# Google AdSense (optional)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-YOUR-ADSENSE-ID

# Site URL (important for SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production URL
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app running!

### 4. Test Key Features

- ✅ Homepage loads correctly
- ✅ Search functionality works
- ✅ Tool pages open properly
- ✅ Category filtering works
- ✅ Mobile menu toggles correctly

---

## Project Overview

### 📁 Key Files & Directories

```
src/
├── app/
│   ├── layout.tsx         → Main app wrapper (Header, Footer)
│   ├── page.tsx           → Homepage
│   ├── globals.css        → Global styles + design tokens
│   ├── tools/             → Individual tool pages
│   └── api/               → API endpoints
├── components/            → Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ToolCard.tsx
│   └── ...
└── lib/                   → Utilities & helpers
    ├── tools-catalog.ts   → Tool definitions
    ├── utils.ts           → Helper functions
    ├── constants.ts       → Design system tokens
    ├── validators.ts      → Input validation
    └── analytics.ts       → Tracking utilities
```

### 🎨 Design System

The app uses a comprehensive design system defined in:
- `src/app/globals.css` - CSS custom properties
- `src/lib/constants.ts` - TypeScript constants

**Color Palette:**
- Primary: Blue (#2563eb)
- Success: Green (#22c55e)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)

**Spacing Scale:** xs (0.25rem) → 3xl (4rem)

**Typography:** Inter font family, weights 400-800

---

## Common Tasks

### Adding a New Tool

1. **Create tool definition** in `src/lib/tools-catalog.ts`:
```typescript
{
  id: 26,
  name: 'My New Tool',
  slug: 'my-new-tool',
  icon: '🔧',
  description: 'Short description of what the tool does',
  category: 'Developer Tools',
  keywords: ['keyword1', 'keyword2']
}
```

2. **Create tool page** at `src/app/tools/my-new-tool/page.tsx`:
```typescript
'use client';

import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import { useState } from 'react';

export default function MyNewTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <>
      <ToolHero
        title="My New Tool"
        description="Detailed description of your tool"
        icon="🔧"
      />
      <ToolContainer>
        {/* Your tool UI here */}
      </ToolContainer>
    </>
  );
}
```

3. **Test your tool** at `http://localhost:3000/tools/my-new-tool`

### Adding Analytics Tracking

```typescript
import { trackToolUsage, trackEvent } from '@/lib/analytics';

// Track when tool is viewed
useEffect(() => {
  trackToolUsage('My New Tool', 'view');
}, []);

// Track when tool is used
const handleConvert = () => {
  trackToolUsage('My New Tool', 'use');
  // ... tool logic
};
```

### Validating User Input

```typescript
import { sanitizeInput, validateFileSize } from '@/lib/validators';

const handleInput = (value: string) => {
  const sanitized = sanitizeInput(value, 5000); // Max 5000 chars
  setInput(sanitized);
};

const handleFileUpload = (file: File) => {
  if (!validateFileSize(file, 10)) {
    alert('File too large! Max 10MB');
    return;
  }
  // ... process file
};
```

---

## Building for Production

### Development Build (Testing)

```bash
npm run build
npm run start
```

This creates an optimized production build and runs it locally.

### Production Deployment

#### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy! ✨

#### Option 2: Self-Hosted

```bash
npm run build
```

Deploy the `.next` folder to any Node.js hosting:
- AWS EC2
- DigitalOcean
- Heroku
- Railway
- Render

---

## Testing Checklist

Before deploying, verify:

- [ ] All tool pages load without errors
- [ ] Search functionality returns correct results
- [ ] Category filters work properly
- [ ] Mobile responsive design looks good
- [ ] Error pages (404) display correctly
- [ ] Sitemap generates at `/sitemap.xml`
- [ ] Google Analytics tracking works
- [ ] Rate limiting activates after 100 requests
- [ ] Security headers are present
- [ ] Forms validate user input
- [ ] File uploads work correctly

---

## Performance Optimization

### Current Setup
- ✅ Static generation for all pages
- ✅ Image optimization (Next.js Image component ready)
- ✅ Code splitting by route
- ✅ Caching headers configured
- ✅ Minification enabled

### Future Improvements
- [ ] Lazy load heavy libraries (`pdf-lib`, `pdfjs-dist`)
- [ ] Implement service worker for offline support
- [ ] Add progressive loading for tool pages
- [ ] Optimize bundle size further

---

## Troubleshooting

### Issue: Development server won't start

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Tailwind classes not working

**Solution:**
- Check `postcss.config.mjs` exists
- Verify `@import "tailwindcss"` in `globals.css`
- Restart dev server

### Issue: Environment variables not loading

**Solution:**
- Ensure `.env.local` exists (not `.env.local.example`)
- Prefix public variables with `NEXT_PUBLIC_`
- Restart dev server after changes

### Issue: Tool page showing 404

**Solution:**
- Verify folder structure: `src/app/tools/[slug]/page.tsx`
- Check tool is added to `tools-catalog.ts`
- Ensure slug matches folder name exactly

---

## Getting Help

- **Documentation**: See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for detailed implementation notes
- **Issues**: Check existing GitHub issues or create a new one
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Docs**: [react.dev](https://react.dev)

---

## Next Steps

1. **Customize branding** - Update logo, colors, favicon
2. **Add more tools** - Expand the tool collection
3. **Implement analytics** - Track user behavior
4. **Optimize performance** - Lazy load heavy libraries
5. **Add tests** - Write unit and E2E tests
6. **Deploy** - Push to production!

---

**Happy coding! 🚀**

*Last updated: March 9, 2026*
