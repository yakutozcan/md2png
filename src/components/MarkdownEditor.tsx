import React from 'react';
import { FileText } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Start typing your markdown here...' 
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-800 text-white px-4 py-2 flex items-center gap-2 rounded-t-lg">
        <FileText size={18} />
        <h2 className="font-medium">Markdown Editor</h2>
      </div>
      <textarea
        className="flex-1 p-4 font-mono text-base bg-slate-900 text-slate-100 resize-none outline-none rounded-b-lg transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck="false"
      />
    </div>
  );
};

export default MarkdownEditor;