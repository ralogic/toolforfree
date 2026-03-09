'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <Link href="/">ToolForFree</Link>
        </div>
        <div className="nav-links">
          <Link href="/r">Tools</Link>
          <button className="theme-toggle" onClick={toggleTheme}>
            <span id="theme-icon">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
