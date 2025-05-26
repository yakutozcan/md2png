import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paintbrush } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownPreviewProps {
  markdown: string;
  theme: string;
}

const MarkdownPreview = forwardRef<HTMLDivElement, MarkdownPreviewProps>(
  ({ markdown, theme }, ref) => {
    // Apply different themes
    const getThemeClasses = () => {
      switch (theme) {
        case 'elegant':
          return 'bg-slate-50 text-slate-900 font-serif';
        case 'dark':
          return 'bg-slate-900 text-slate-50';
        case 'vibrant':
          return 'bg-gradient-to-br from-indigo-500 to-purple-700 text-white';
        case 'minimal':
          return 'bg-white text-gray-800 border border-gray-200';
        case 'modern':
          return 'bg-gradient-to-r from-sky-400 to-blue-500 text-white';
        case 'retro':
          return 'bg-amber-50 text-amber-900 font-serif';
        case 'nature':
          return 'bg-gradient-to-br from-emerald-400 to-green-600 text-white';
        case 'ocean':
          return 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white';
        case 'sunset':
          return 'bg-gradient-to-br from-orange-400 to-pink-600 text-white';
        default:
          return 'bg-white text-slate-900';
      }
    };

    return (
      <div className="flex flex-col h-full">
        <div className="bg-slate-800 text-white px-4 py-2 flex items-center gap-2 rounded-t-lg">
          <Paintbrush size={18} />
          <h2 className="font-medium">Preview</h2>
        </div>
        <div
          ref={ref}
          className={`flex-1 p-6 overflow-auto rounded-b-lg markdown-body ${getThemeClasses()}`}
        >
          {markdown ? (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={coldarkDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          ) : (
            <div className="text-slate-400 italic">
              Your preview will appear here...
            </div>
          )}
        </div>
      </div>
    );
  }
);

MarkdownPreview.displayName = 'MarkdownPreview';

export default MarkdownPreview;