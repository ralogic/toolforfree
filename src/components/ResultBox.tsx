'use client';

interface ResultBoxProps {
  title: string;
  children: React.ReactNode;
  downloadLink?: { href: string; filename: string };
  copyText?: string;
}

export default function ResultBox({
  title,
  children,
  downloadLink,
  copyText
}: ResultBoxProps) {
  const handleCopy = () => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex gap-2">
          {copyText && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              📋 Copy
            </button>
          )}
          {downloadLink && (
            <a
              href={downloadLink.href}
              download={downloadLink.filename}
              className="px-3 py-1 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:shadow-lg transition-shadow"
            >
              ⬇️ Download
            </a>
          )}
        </div>
      </div>
      <div className="text-gray-700 whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
