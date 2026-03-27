'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="navbar container mx-auto flex items-center justify-between px-4 py-4">
        <div className="logo">
          <Link href="/" className="text-2xl font-bold text-slate-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400">
            ToolForFree
          </Link>

        </div>
        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
        <script>
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "ef0bd327-e01f-44ef-a0e1-0b80f77d28c4",
              safari_web_id: "web.onesignal.auto.10bba952-d3e6-4be7-b269-bd5caae877a4",
              notifyButton: {
                enable: true,
              },
            });
       });
        </script>
        <div className="nav-links flex items-center gap-4">
          <Link href="/tools" className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">
            Tools
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
