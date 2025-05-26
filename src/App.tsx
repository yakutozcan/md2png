import React, { useState, useRef, useCallback } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import ThemeSelector from './components/ThemeSelector';
import Toast, { ToastType } from './components/Toast';
import { convertToPng, downloadImage, copyImageToClipboard } from './utils/imageConverter';
import { FileImage } from 'lucide-react';

const DEFAULT_MARKDOWN = `# Markdown to PNG Converter

## Features
- Convert Markdown to beautiful PNG images
- Customize with different themes
- Syntax highlighting for code blocks

\`\`\`javascript
// Example code block with syntax highlighting
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

> This is a blockquote with a nice styling

- List item 1
- List item 2
- List item 3

Visit [GitHub](https://github.com) for more information.
`;

function App() {
  const [markdown, setMarkdown] = useState('');
  const [theme, setTheme] = useState('default');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: ToastType; message: string }>({
    type: null,
    message: '',
  });
  
  const previewRef = useRef<HTMLDivElement>(null);

  const handleConvert = async () => {
    if (!previewRef.current || !markdown.trim()) return;
    
    try {
      const dataUrl = await convertToPng(previewRef.current);
      if (dataUrl) {
        setImageUrl(dataUrl);
        downloadImage(dataUrl);
        showToast('success', 'PNG image has been generated and downloaded!');
      } else {
        showToast('error', 'Failed to convert to PNG. Please try again.');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'An error occurred during conversion.');
    }
  };

  const handleCopy = async () => {
    if (!imageUrl) {
      // Generate image first if it doesn't exist
      if (!previewRef.current || !markdown.trim()) return;
      const dataUrl = await convertToPng(previewRef.current);
      if (!dataUrl) {
        showToast('error', 'Failed to generate image. Please try again.');
        return;
      }
      setImageUrl(dataUrl);
      
      const success = await copyImageToClipboard(dataUrl);
      if (success) {
        showToast('success', 'Image copied to clipboard!');
      } else {
        showToast('error', 'Failed to copy to clipboard. Try downloading instead.');
      }
    } else {
      // Use existing image
      const success = await copyImageToClipboard(imageUrl);
      if (success) {
        showToast('success', 'Image copied to clipboard!');
      } else {
        showToast('error', 'Failed to copy to clipboard. Try downloading instead.');
      }
    }
  };

  const handleClear = () => {
    setMarkdown('');
    setImageUrl(null);
  };

  const handleInsertTemplate = () => {
    setMarkdown(DEFAULT_MARKDOWN);
  };

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
  };

  const closeToast = () => {
    setToast({ type: null, message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileImage size={24} className="text-indigo-400" />
            <h1 className="text-xl font-bold">Markdown to PNG</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
          <Toolbar
            onConvert={handleConvert}
            onClear={handleClear}
            onCopy={handleCopy}
            onInsertTemplate={handleInsertTemplate}
            canConvert={markdown.trim().length > 0}
          />
          <ThemeSelector currentTheme={theme} onChange={setTheme} />
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
          <MarkdownEditor
            value={markdown}
            onChange={(value) => {
              setMarkdown(value);
              setImageUrl(null); // Clear previous image when content changes
            }}
          />
          <MarkdownPreview 
            ref={previewRef} 
            markdown={markdown} 
            theme={theme} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 border-t border-slate-700 text-center text-sm text-slate-400">
        <p>Convert your Markdown to beautiful PNG images with ease. Visit <a href="https://yakut.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">yakut.dev</a></p>
      </footer>

      {/* Toast notifications */}
      <Toast
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />
    </div>
  );
}

export default App;