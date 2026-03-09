# ToolForFree Design System - Quick Reference Card

## 🚀 TL;DR

**Design System:** Complete, production-ready  
**Status:** ✅ Ready to integrate  
**Time to implement:** 5-8 hours  

---

## 📁 Files to Copy

1. **Main CSS:** `public/assets/css/design-system.css`
2. **Docs:** `public/assets/css/DESIGN_SYSTEM_DOCS.md`
3. **Examples:** `public/assets/examples/homepage-example.html`
4. **Spec:** `public/assets/examples/design-spec.html`

---

## 🎨 Design Tokens

### Colors
```
--primary-500: #2563EB      (Blue - brand)
--primary-600: #1D4ED8      (Blue - hover)
--primary-700: #1E40AF      (Blue - active)
--accent-500:  #7C3AED      (Violet)
--teal-500:    #14B8A6      (Privacy/fast)
--success-500: #16A34A      (Green)
--warning-500: #F59E0B      (Amber)
--danger-500:  #EF4444      (Red)
```

### Fonts
```
--font-display: "Space Grotesk"   (Headings)
--font-body:    "Inter"            (Body)
--font-mono:    "JetBrains Mono"   (Code)
```

### Spacing
```
--sp-1:  4px      --sp-10: 40px
--sp-2:  8px      --sp-12: 48px
--sp-3:  12px     --sp-16: 64px
--sp-4:  16px     --sp-20: 80px
--sp-5:  20px
--sp-6:  24px
--sp-8:  32px
```

### Radii
```
--radius-sm: 10px
--radius-md: 14px
--radius-lg: 18px
--radius-xl: 24px
```

---

## 🪑 Component Classes

### Buttons
```html
<button class="btn btn-primary btn-lg">CTA</button>
<button class="btn btn-ghost btn-md">Secondary</button>
<button class="icon-btn">🔍</button>
```

### Inputs
```html
<input class="input" placeholder="Text">
<input class="input input-lg" placeholder="Large">
<div class="search-wrapper">
  <svg class="search-icon">...</svg>
  <input class="input search-input" placeholder="Search...">
</div>
```

### Cards
```html
<article class="card">
  <div class="card-header">
    <div class="card-icon">📄</div>
    <span class="card-tag card-tag-pdf">PDF</span>
  </div>
  <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-desc">Description...</p>
  </div>
  <div class="card-footer">
    <a href="#" class="card-link">Open → </a>
    <div class="card-badges">
      <span class="card-badge">🔒 Private</span>
    </div>
  </div>
</article>
```

### Chips
```html
<div class="chips-group">
  <button class="chip chip-active">Active</button>
  <button class="chip">Inactive</button>
</div>
```

### Navbar
```html
<header class="navbar">
  <div class="navbar-container">
    <a href="/" class="navbar-brand">
      ToolForFree
      <span class="navbar-badge">Trusted</span>
    </a>
    <nav>
      <ul class="navbar-nav">
        <li><a href="#" class="nav-link active">Tools</a></li>
      </ul>
    </nav>
    <div class="navbar-actions">
      <button class="icon-btn">🔍</button>
    </div>
  </div>
</header>
```

### Hero
```html
<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <span class="hero-badge">Badge</span>
      <h1 class="hero-title">Title</h1>
      <p class="hero-subtitle">Subtitle</p>
      <div class="hero-actions">
        <button class="btn btn-primary">CTA</button>
      </div>
    </div>
    <div class="hero-panel">
      <h3 class="hero-panel-title">Panel</h3>
    </div>
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
        <p class="footer-desc">...</p>
      </div>
      <div>
        <h6 class="footer-section-title">Links</h6>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Link</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
```

---

## 📐 Layout Classes

```html
<!-- Container -->
<div class="container">...</div>

<!-- Grid (responsive) -->
<div class="grid grid-cols-1 grid-cols-2-md grid-cols-3-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Stack (vertical) -->
<div class="stack stack-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Cluster (horizontal) -->
<div class="cluster cluster-md">
  <button>Button 1</button>
  <button>Button 2</button>
</div>

<!-- Section -->
<section class="section">
  <div class="container">...</div>
</section>
```

---

## 🌓 Dark Mode Setup

```tsx
// React/Next.js
useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}, []);

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};
```

```html
<!-- HTML -->
<html lang="en" data-theme="light">
  <!-- content -->
</html>
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
.example { /* < 768px */ }

@media (min-width: 768px) {
  .example { /* 768px - 1023px */ }
}

@media (min-width: 1024px) {
  .example { /* 1024px+ */ }
}
```

**Predefined Classes:**
- `.grid-cols-1` → 1 column
- `.grid-cols-2-md` → 2 columns on tablet+
- `.grid-cols-3-lg` → 3 columns on desktop+

---

## ♿ Accessibility

### Built-in
- Focus rings (3px blue)
- Reduced motion support
- Semantic HTML
- WCAG AAA color contrast

### To Add
```html
<!-- Always add aria-label to icon buttons -->
<button class="icon-btn" aria-label="Search">🔍</button>

<!-- Use semantic elements -->
<nav> ... </nav>
<main> ... </main>
<footer> ... </footer>

<!-- Images need alt text -->
<img src="..." alt="Description" loading="lazy" />

<!-- Screen reader text -->
<span class="sr-only">Loading...</span>
```

---

## 🎯 Card Tags (Color Variants)

```html
<span class="card-tag card-tag-pdf">PDF Tools</span>
<span class="card-tag card-tag-image">Image Tools</span>
<span class="card-tag card-tag-text">Text Tools</span>
<span class="card-tag card-tag-developer">Developer</span>
<span class="card-tag card-tag-utility">Utility</span>
```

---

## 🔧 Common Patterns

### Search Bar
```html
<div class="search-wrapper">
  <svg class="search-icon">...</svg>
  <input class="input input-lg search-input" placeholder="...">
  <span class="search-kbd">⌘K</span>
</div>
```

### Button Group
```html
<div class="hero-actions">
  <button class="btn btn-primary btn-lg">Primary</button>
  <button class="btn btn-ghost btn-lg">Secondary</button>
</div>
```

### Section Header
```html
<div class="section-header">
  <div>
    <h3 class="section-title">Title</h3>
    <p class="section-subtitle">Subtitle</p>
  </div>
  <a href="#" class="section-action">
    See all →
  </a>
</div>
```

---

## 📊 Typography Styles

```html
<h1>Heading 1 (3.25rem)</h1>
<h2>Heading 2 (2.25rem)</h2>
<h3>Heading 3 (1.75rem)</h3>
<h4>Heading 4 (1.375rem)</h4>
<h5>Heading 5 (1.125rem)</h5>
<h6>Heading 6 (1rem)</h6>

<p class="body-lg">Body Large (1.0625rem)</p>
<p>Body (1rem)</p>
<p class="small-text">Small (0.875rem)</p>
<p class="caption">CAPTION (0.75rem)</p>
```

---

## 🎬 Motion

```css
--motion-fast: 120ms ease-out
--motion-normal: 180ms cubic-bezier(.2,.8,.2,1)
--motion-slow: 260ms cubic-bezier(.2,.8,.2,1)
```

All transitions use these. Automatically disabled for `prefers-reduced-motion`.

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Fonts not loading | Check Google Fonts CDN, preconnect in `<head>` |
| Dark mode flicker | Set theme in useEffect or SSR |
| Cards not hovering | Remove transform from parent |
| Focus ring not showing | Check z-index, use `:focus-visible` |
| Colors look off | Ensure correct data-theme on `<html>` |
| Layout broken on mobile | Add responsive grid classes |

---

## 📦 Integration Steps (Quick)

1. Import CSS: `<link rel="stylesheet" href="/assets/css/design-system.css">`
2. Add theme support: `<html data-theme="light">`
3. Copy component snippets from this card
4. Replace existing components
5. Test responsive + dark mode
6. Done! 🎉

---

## 🔗 Full Documentation

- **CSS Reference:** `public/assets/css/DESIGN_SYSTEM_DOCS.md`
- **React Guide:** `REACT_COMPONENTS_GUIDE.md`
- **Integration:** `INTEGRATION_GUIDE.md`
- **Examples:** `public/assets/examples/homepage-example.html`
- **Spec Viewer:** `public/assets/examples/design-spec.html`

---

## 📞 Next Actions

1. ✅ Review this quick reference
2. ✅ Open `design-spec.html` in browser
3. ✅ Read `INTEGRATION_GUIDE.md`
4. ✅ Start copying components
5. ✅ Test thoroughly
6. ✅ Deploy with confidence

---

**Design System v1.0.0 - Production Ready ✅**
