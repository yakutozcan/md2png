import React from 'react';
import { 
  Download, 
  Copy, 
  Trash2, 
  HelpCircle, 
  Code,
  FileImage
} from 'lucide-react';

interface ToolbarProps {
  onConvert: () => void;
  onClear: () => void;
  onCopy: () => void;
  onInsertTemplate: () => void;
  canConvert: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  onConvert, 
  onClear, 
  onCopy,
  onInsertTemplate,
  canConvert 
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
      <div className="flex gap-2">
        <button
          onClick={onInsertTemplate}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md text-slate-200 hover:bg-slate-700 transition-colors"
          title="Insert template"
        >
          <Code size={16} />
          <span className="hidden sm:inline">Template</span>
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md text-slate-200 hover:bg-slate-700 transition-colors"
          title="Clear editor"
        >
          <Trash2 size={16} />
          <span className="hidden sm:inline">Clear</span>
        </button>
        
        <button
          onClick={onCopy}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md text-slate-200 hover:bg-slate-700 transition-colors"
          title="Copy to clipboard"
          disabled={!canConvert}
        >
          <Copy size={16} />
          <span className="hidden sm:inline">Copy</span>
        </button>

        <button
          onClick={onConvert}
          disabled={!canConvert}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            canConvert
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-slate-700 text-slate-300 cursor-not-allowed'
          }`}
          title="Convert to PNG"
        >
          <FileImage size={16} />
          <span>Convert to PNG</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;