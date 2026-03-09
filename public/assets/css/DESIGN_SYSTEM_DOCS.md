# ToolForFree Design System

## Overview

A complete, production-ready design system for ToolForFree featuring:
- **Modern aesthetic**: Clean SaaS design with soft gradient accents
- **Fully responsive**: Mobile-first, optimized for all screen sizes
- **Dark mode**: Complete dark theme with automatic preferences detection
- **Accessible**: WCAG-compliant with focus states and reduced motion support
- **Performance-optimized**: Minimal CSS, no framework dependencies

---

## 📦 Quick Start

### 1. Import the CSS

Add to your HTML `<head>` or import in your app:

```html
<link rel="stylesheet" href="/assets/css/design-system.css">
```

Or in React/Next.js:

```jsx
import '@/public/assets/css/design-system.css';
```

### 2. Set up theme toggle

```html
<html lang="en" data-theme="light">
```

Toggle between `data-theme="light"` and `data-theme="dark"` on the `<html>` element.

### 3. Use components

```html
<button class="btn btn-primary btn-lg">Get Started</button>
```

---

## 🎨 Design Tokens

### Colors

#### Palette
```css
/* Brand Colors */
--primary-500: #2563EB  /* Primary blue */
--primary-600: #1D4ED8  /* Darker blue */
--accent-500: #7C3AED   /* Violet accent */
--teal-500: #14B8A6     /* Highlight/trust */

/* Neutrals (Light Theme) */
--n-0 to --n-900        /* White to dark slate */

/* Semantic */
--success-500: #16A34A
--warning-500: #F59E0B
--danger-500: #EF4444
--info-500: #0EA5E9
```

#### Surface Tokens (Auto-switching)
```css
--bg             /* Page background */
--surface        /* Card/panel background */
--surface-2      /* Secondary surface */
--text           /* Primary text */
--text-2         /* Secondary text */
--text-3         /* Tertiary/muted text */
--border         /* Default border */
--border-strong  /* Emphasized border */
```

### Typography

#### Fonts
```css
--font-display: "Space Grotesk", ...  /* Headings */
--font-body: "Inter", ...             /* Body text */
--font-mono: "JetBrains Mono", ...    /* Code */
```

#### Scale
- **H1**: 3.25rem (52px)
- **H2**: 2.25rem (36px)
- **H3**: 1.75rem (28px)
- **H4**: 1.375rem (22px)
- **H5**: 1.125rem (18px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)
- **Caption**: 0.75rem (12px)

### Spacing

```css
--sp-1: 4px
--sp-2: 8px
--sp-3: 12px
--sp-4: 16px
--sp-5: 20px
--sp-6: 24px
--sp-8: 32px
--sp-10: 40px
--sp-12: 48px
--sp-16: 64px
--sp-20: 80px
```

### Radii

```css
--radius-sm: 10px
--radius-md: 14px
--radius-lg: 18px
--radius-xl: 24px
```

### Shadows

```css
--shadow-sm: Subtle elevation
--shadow-md: Card/panel depth
--shadow-lg: Modal/overlay depth
```

### Motion

```css
--motion-fast: 120ms ease-out
--motion-normal: 180ms cubic-bezier(.2,.8,.2,1)
--motion-slow: 260ms cubic-bezier(.2,.8,.2,1)
```

---

## 🧩 Components

### Buttons

```html
<!-- Primary -->
<button class="btn btn-primary btn-lg">Primary Action</button>

<!-- Ghost -->
<button class="btn btn-ghost btn-md">Secondary Action</button>

<!-- Icon -->
<button class="icon-btn" aria-label="Settings">
  <svg>...</svg>
</button>
```

**Sizes**: `btn-sm` (36px), `btn-md` (40px), `btn-lg` (44px)

**Variants**: `btn-primary`, `btn-ghost`

### Inputs

```html
<!-- Standard Input -->
<input type="text" class="input" placeholder="Enter text...">

<!-- Large Input (Hero) -->
<input type="search" class="input input-lg" placeholder="Search...">

<!-- Search with Icon -->
<div class="search-wrapper">
  <svg class="search-icon">...</svg>
  <input type="search" class="input search-input" placeholder="Search...">
  <span class="search-kbd">⌘K</span>
</div>
```

### Cards

```html
<article class="card">
  <div class="card-header">
    <div class="card-icon">📄</div>
    <span class="card-tag card-tag-pdf">PDF Tools</span>
  </div>
  <div class="card-body">
    <h5 class="card-title">Tool Name</h5>
    <p class="card-desc">Tool description goes here...</p>
  </div>
  <div class="card-footer">
    <a href="/tool" class="card-link">
      Open tool →
    </a>
    <div class="card-badges">
      <span class="card-badge">🔒 Private</span>
      <span class="card-badge">⚡ Fast</span>
    </div>
  </div>
</article>
```

**Tag Variants**: 
- `card-tag-pdf` (Red)
- `card-tag-image` (Violet)
- `card-tag-text` (Teal)
- `card-tag-developer` (Blue)
- `card-tag-utility` (Amber)

### Chips / Tabs

```html
<div class="chips-group">
  <button class="chip chip-active">All Tools</button>
  <button class="chip">PDF Tools</button>
  <button class="chip">Image Tools</button>
</div>
```

### Navigation

```html
<nav class="navbar">
  <div class="navbar-container">
    <a href="/" class="navbar-brand">
      ToolForFree
      <span class="navbar-badge">Trusted Free Tools</span>
    </a>
    
    <ul class="navbar-nav">
      <li><a href="/tools" class="nav-link active">Tools</a></li>
      <li><a href="/about" class="nav-link">About</a></li>
    </ul>
    
    <div class="navbar-actions">
      <button class="icon-btn">🔍</button>
      <button class="icon-btn" id="themeToggle">🌓</button>
    </div>
  </div>
</nav>
```

---

## 📐 Layout Utilities

### Container

```html
<div class="container">
  <!-- Max-width 1120px, responsive padding -->
</div>
```

### Grid

```html
<!-- Responsive 3-column grid (3 desktop, 2 tablet, 1 mobile) -->
<div class="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Stack (Vertical)

```html
<div class="stack stack-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Sizes**: `stack-sm`, `stack-md`, `stack-lg`, `stack-xl`

### Cluster (Horizontal)

```html
<div class="cluster cluster-md">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

**Sizes**: `cluster-sm`, `cluster-md`, `cluster-lg`

### Section

```html
<section class="section">
  <div class="container">
    <!-- Content with vertical padding -->
  </div>
</section>
```

---

## 🌓 Dark Mode

### Setup

```javascript
// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Toggle theme
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

### Detect system preference

```javascript
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

---

## ♿ Accessibility

### Focus States

All interactive elements have visible `:focus-visible` states with blue rings.

### Reduced Motion

Automatically respects `prefers-reduced-motion`:
- Disables transforms
- Reduces animations to 1ms
- Maintains functionality

### Screen Readers

Use `.sr-only` for screen-reader-only text:

```html
<button aria-label="Close">
  <span class="sr-only">Close</span>
  <svg>...</svg>
</button>
```

### ARIA Labels

Always provide `aria-label` for icon-only buttons:

```html
<button class="icon-btn" aria-label="Toggle theme">
  <svg>...</svg>
</button>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile-first approach */
/* Base: < 768px (mobile) */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}
```

### Typography scales down on mobile

Headings automatically reduce on screens < 768px.

---

## 🎯 Common Patterns

### Hero Section

```html
<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <span class="hero-badge">Badge</span>
      <h1 class="hero-title">Hero Title</h1>
      <p class="hero-subtitle">Subtitle text...</p>
      <div class="hero-actions">
        <button class="btn btn-primary btn-lg">CTA</button>
      </div>
    </div>
    <div class="hero-panel">
      <h3 class="hero-panel-title">Panel Title</h3>
      <!-- Content -->
    </div>
  </div>
</section>
```

### Section with Header

```html
<section class="section">
  <div class="container">
    <div class="section-header">
      <div>
        <h3 class="section-title">Section Title</h3>
        <p class="section-subtitle">Subtitle</p>
      </div>
      <a href="/more" class="section-action">
        See all →
      </a>
    </div>
    <!-- Content -->
  </div>
</section>
```

### Footer

```html
<footer class="footer">
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">Brand</div>
        <p class="footer-desc">Description...</p>
      </div>
      <div>
        <h6 class="footer-section-title">Links</h6>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Link</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copyright">© 2026</p>
    </div>
  </div>
</footer>
```

---

## 🚀 Performance Tips

1. **Enable CSS minification** in production
2. **Preload Google Fonts** for faster rendering:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```
3. **Use `loading="lazy"` for images** in cards
4. **Defer non-critical JavaScript**

---

## 🎨 Customization

### Changing Primary Color

Override in your CSS after importing the design system:

```css
:root {
  --primary-500: #8B5CF6;  /* Purple */
  --primary-600: #7C3AED;
  --primary-700: #6D28D9;
}
```

### Adding Custom Components

Follow naming conventions:

```css
.my-component {
  /* Use design tokens */
  background: var(--surface);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--sp-4);
}
```

---

## 📦 Files Included

```
public/assets/
├── css/
│   └── design-system.css      # Complete design system
└── examples/
    └── homepage-example.html   # Full working example
```

---

## 🛠️ Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+
- Samsung Internet 14+

**Features used**:
- CSS Custom Properties
- CSS Grid
- Flexbox
- `backdrop-filter` (with fallback)
- `:focus-visible`

---

## 📝 License

MIT License - Free to use for personal and commercial projects.

---

## 💡 Tips

1. **Always use design tokens** instead of hardcoded values
2. **Test in dark mode** during development
3. **Check keyboard navigation** for all interactive elements
4. **Use semantic HTML** (`<button>`, `<nav>`, `<main>`, etc.)
5. **Provide alt text** for all images
6. **Test with screen readers** (NVDA, VoiceOver)

---

## 🐛 Troubleshooting

### Fonts not loading?
Check the Google Fonts CDN is reachable. Fallback fonts will be used automatically.

### Dark mode not working?
Ensure `data-theme="dark"` is on the `<html>` element, not `<body>`.

### Cards not hovering correctly?
Check z-index stacking context - card should not be inside another transformed element.

### Buttons look wrong?
Make sure you're using `<button>` tags, not `<div>` or `<a>` (unless it's a link).

---

## 📚 Additional Resources

- [Example HTML file](../examples/homepage-example.html)
- [React Components](./REACT_COMPONENTS.md)
- [Next.js Integration](./NEXTJS_INTEGRATION.md)

---

**Questions?** Open an issue or contact the design team.

**Happy building! 🎉**
