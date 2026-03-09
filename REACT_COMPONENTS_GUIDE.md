# React/Next.js Component Examples

Complete React component implementations using the ToolForFree design system.

## Setup

1. Import the design system CSS in your `_app.tsx` or `layout.tsx`:

```tsx
import '@/public/assets/css/design-system.css';
```

2. Create reusable components in `src/components/`

---

## Core Components

### Button Component

```tsx
// components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`.trim();
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// Usage
<Button variant="primary" size="lg" onClick={handleClick}>
  Get Started
</Button>
```

### Icon Button

```tsx
// components/ui/IconButton.tsx
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  className = '',
  ...props
}) => {
  return (
    <button className={`icon-btn ${className}`} aria-label={label} {...props}>
      {icon}
    </button>
  );
};

// Usage
<IconButton 
  icon={<SearchIcon />} 
  label="Search tools"
  onClick={handleSearch}
/>
```

### Input Component

```tsx
// components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  large?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ large, className = '', ...props }, ref) => {
    const classes = `input ${large ? 'input-lg' : ''} ${className}`.trim();
    
    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = 'Input';

// Usage
<Input 
  type="search"
  placeholder="Search tools..."
  large
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

### Search Bar Component

```tsx
// components/ui/SearchBar.tsx
'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showKbd?: boolean;
  large?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  showKbd = false,
  large = false,
}) => {
  const [query, setQuery] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };
  
  return (
    <div className="search-wrapper">
      <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        className={`input ${large ? 'input-lg' : ''} search-input`}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {showKbd && <span className="search-kbd">⌘K</span>}
    </div>
  );
};
```

### Chip Component

```tsx
// components/ui/Chip.tsx
import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  active = false,
  onClick,
}) => {
  return (
    <button 
      className={`chip ${active ? 'chip-active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Chip Group Component
interface ChipGroupProps {
  children: React.ReactNode;
}

export const ChipGroup: React.FC<ChipGroupProps> = ({ children }) => {
  return <div className="chips-group">{children}</div>;
};

// Usage
<ChipGroup>
  <Chip active>All Tools</Chip>
  <Chip onClick={() => setCategory('pdf')}>PDF Tools</Chip>
  <Chip onClick={() => setCategory('image')}>Image Tools</Chip>
</ChipGroup>
```

### Card Component

```tsx
// components/ui/Card.tsx
import React from 'react';
import Link from 'next/link';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: 'pdf' | 'image' | 'text' | 'developer' | 'utility';
  categoryLabel: string;
  href: string;
  badges?: Array<{ icon: string; label: string }>;
}

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  category,
  categoryLabel,
  href,
  badges = [],
}) => {
  return (
    <article className="card">
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <span className={`card-tag card-tag-${category}`}>
          {categoryLabel}
        </span>
      </div>
      
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-desc">{description}</p>
      </div>
      
      <div className="card-footer">
        <Link href={href} className="card-link">
          Open tool
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
        {badges.length > 0 && (
          <div className="card-badges">
            {badges.map((badge, idx) => (
              <span key={idx} className="card-badge">
                {badge.icon} {badge.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

// Usage
<Card
  icon="📄"
  title="PDF Merge"
  description="Combine multiple PDF files into a single document with ease."
  category="pdf"
  categoryLabel="PDF Tools"
  href="/tools/pdf-merge"
  badges={[
    { icon: '🔒', label: 'Private' },
    { icon: '⚡', label: 'Fast' }
  ]}
/>
```

---

## Layout Components

### Container

```tsx
// components/layout/Container.tsx
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return <div className={`container ${className}`}>{children}</div>;
};
```

### Grid

```tsx
// components/layout/Grid.tsx
import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: {
    base?: number;
    md?: number;
    lg?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = { base: 1, md: 2, lg: 3 },
  className = '',
}) => {
  const colClasses = [
    cols.base ? `grid-cols-${cols.base}` : '',
    cols.md ? `grid-cols-${cols.md}-md` : '',
    cols.lg ? `grid-cols-${cols.lg}-lg` : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`grid ${colClasses} ${className}`}>
      {children}
    </div>
  );
};

// Usage
<Grid cols={{ base: 1, md: 2, lg: 3 }}>
  <Card {...props1} />
  <Card {...props2} />
  <Card {...props3} />
</Grid>
```

### Stack

```tsx
// components/layout/Stack.tsx
import React from 'react';

interface StackProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  spacing = 'md',
  className = '',
}) => {
  return (
    <div className={`stack stack-${spacing} ${className}`}>
      {children}
    </div>
  );
};
```

---

## Page Components

### Hero Section

```tsx
// components/sections/Hero.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { ChipGroup, Chip } from '@/components/ui/Chip';

export const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const popularTools = ['PDF Merger', 'Image Compressor', 'JSON Formatter'];
  
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-badge">Trusted Free Tools</span>
          
          <h1 className="hero-title">
            Free Online Tools for Developers and Creators
          </h1>
          
          <p className="hero-subtitle">
            ToolForFree helps you handle PDFs, images, text, and developer tasks 
            with a clean, fast, and privacy-friendly experience.
          </p>
          
          {/* Search */}
          <div className="hero-search">
            <SearchBar
              placeholder="Search by tool name, keyword, or category"
              onSearch={setSearchQuery}
              showKbd
              large
            />
            
            <ChipGroup>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-3)', fontWeight: 500 }}>
                Popular:
              </span>
              {popularTools.map((tool) => (
                <Chip key={tool} onClick={() => setSearchQuery(tool)}>
                  {tool}
                </Chip>
              ))}
            </ChipGroup>
          </div>
          
          {/* Actions */}
          <div className="hero-actions">
            <Button variant="primary" size="lg">
              Browse All Tools
            </Button>
            <Button variant="ghost" size="lg">
              Visit devprayog.tech
            </Button>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="hero-panel">
          <h3 className="hero-panel-title">Search Results</h3>
          <div className="hero-panel-empty">
            Start typing to find tools instantly.
          </div>
        </div>
      </div>
    </section>
  );
};
```

### Navbar

```tsx
// components/sections/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconButton } from '@/components/ui/IconButton';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <Link href="/" className="navbar-brand">
          <span>ToolForFree</span>
          <span className="navbar-badge">Trusted Free Tools</span>
        </Link>
        
        {/* Navigation */}
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link 
                href="/tools" 
                className={`nav-link ${isActive('/tools') ? 'active' : ''}`}
              >
                Tools
              </Link>
            </li>
            <li>
              <Link 
                href="/tools?category=pdf" 
                className="nav-link"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Actions */}
        <div className="navbar-actions">
          <IconButton
            icon={<SearchIcon />}
            label="Search tools"
            onClick={() => {/* Open search modal */}}
          />
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

// Search Icon Component
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
```

### Theme Toggle

```tsx
// components/ui/ThemeToggle.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { IconButton } from './IconButton';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <IconButton
      icon={theme === 'light' ? <MoonIcon /> : <SunIcon />}
      label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme}
    />
  );
};

const SunIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
```

### Footer

```tsx
// components/sections/Footer.tsx
import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">ToolForFree</div>
            <p className="footer-desc">
              Free online tools for developers and creators. Fast, private, and 
              polished experience. All processing happens in your browser.
            </p>
            <div className="footer-trust">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Privacy-First
            </div>
          </div>
          
          {/* Tools Column */}
          <div>
            <h6 className="footer-section-title">Tools</h6>
            <ul className="footer-links">
              <li><Link href="/tools" className="footer-link">All Tools</Link></li>
              <li><Link href="/tools?category=pdf" className="footer-link">PDF Tools</Link></li>
              <li><Link href="/tools?category=image" className="footer-link">Image Tools</Link></li>
              <li><Link href="/tools?category=text" className="footer-link">Text Tools</Link></li>
              <li><Link href="/tools?category=developer" className="footer-link">Developer Tools</Link></li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h6 className="footer-section-title">Company</h6>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/contact" className="footer-link">Contact</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms of Service</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 ToolForFree. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a 
              href="https://devprayog.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              style={{ fontSize: '0.875rem' }}
            >
              Built by devprayog.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

### Tools Grid Section

```tsx
// components/sections/ToolsGrid.tsx
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Grid } from '@/components/layout/Grid';
import { Container } from '@/components/layout/Container';

interface Tool {
  slug: string;
  title: string;
  description: string;
  category: 'pdf' | 'image' | 'text' | 'developer' | 'utility';
  categoryLabel: string;
  icon: string;
  badges?: Array<{ icon: string; label: string }>;
}

interface ToolsGridProps {
  title: string;
  subtitle?: string;
  tools: Tool[];
  showViewAll?: boolean;
  viewAllHref?: string;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({
  title,
  subtitle,
  tools,
  showViewAll = false,
  viewAllHref = '/tools',
}) => {
  return (
    <section className="section">
      <Container>
        {/* Section Header */}
        <div className="section-header">
          <div>
            <h3 className="section-title">{title}</h3>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          {showViewAll && (
            <a href={viewAllHref} className="section-action">
              See all tools
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
        
        {/* Tools Grid */}
        <Grid cols={{ base: 1, md: 2, lg: 3 }}>
          {tools.map((tool) => (
            <Card
              key={tool.slug}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              category={tool.category}
              categoryLabel={tool.categoryLabel}
              href={`/tools/${tool.slug}`}
              badges={tool.badges}
            />
          ))}
        </Grid>
      </Container>
    </section>
  );
};
```

---

## Complete Page Example

```tsx
// app/page.tsx
'use client';

import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ToolsGrid } from '@/components/sections/ToolsGrid';
import { Footer } from '@/components/sections/Footer';
import { TOOLS_CATALOG } from '@/lib/tools-catalog';

export default function HomePage() {
  const popularTools = TOOLS_CATALOG.allTools.slice(0, 6).map(tool => ({
    slug: tool.slug,
    title: tool.title,
    description: tool.description,
    category: tool.category as any,
    categoryLabel: tool.categoryLabel || tool.category,
    icon: tool.icon || '🛠️',
    badges: [
      { icon: '🔒', label: 'Private' },
      { icon: '⚡', label: 'Fast' }
    ]
  }));
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolsGrid
          title="Popular Tools"
          subtitle="Most used tools by our community"
          tools={popularTools}
          showViewAll
          viewAllHref="/tools"
        />
      </main>
      <Footer />
    </>
  );
}
```

---

## TypeScript Types

```tsx
// types/design-system.ts

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ToolCategory = 'pdf' | 'image' | 'text' | 'developer' | 'utility';
export type Theme = 'light' | 'dark';
export type SpacingSize = 'sm' | 'md' | 'lg' | 'xl';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  icon: string;
  badges?: Badge[];
}

export interface Badge {
  icon: string;
  label: string;
}
```

---

## Hooks

### useTheme Hook

```tsx
// hooks/useTheme.ts
'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  return { theme, toggleTheme, setTheme };
};
```

### useScrollPosition Hook

```tsx
// hooks/useScrollPosition.ts
'use client';

import { useState, useEffect } from 'react';

export const useScrollPosition = (threshold: number = 0) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  return scrolled;
};
```

---

## Best Practices

1. **Always use semantic HTML** with proper ARIA labels
2. **Keep components small and focused**
3. **Use TypeScript** for type safety
4. **Export component types** for reusability
5. **Handle loading and error states**
6. **Test accessibility** with keyboard navigation
7. **Use Next.js Link** for internal navigation
8. **Optimize images** with next/image when possible

---

## Next Steps

1. Create a component library in `src/components/ui/`
2. Build layout components in `src/components/layout/`
3. Create section components in `src/components/sections/`
4. Test all components in Storybook (optional)
5. Document props with JSDoc comments
6. Add unit tests with Jest/React Testing Library

---

**Happy coding! 🚀**
