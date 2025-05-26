import React from 'react';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: string;
  onChange: (theme: string) => void;
}

const themes = [
  { id: 'default', name: 'Default', color: 'bg-white' },
  { id: 'elegant', name: 'Elegant', color: 'bg-slate-50' },
  { id: 'dark', name: 'Dark', color: 'bg-slate-900' },
  { id: 'vibrant', name: 'Vibrant', color: 'bg-gradient-to-br from-indigo-500 to-purple-700' },
  { id: 'minimal', name: 'Minimal', color: 'bg-white border border-gray-200' },
  { id: 'modern', name: 'Modern', color: 'bg-gradient-to-r from-sky-400 to-blue-500' },
  { id: 'retro', name: 'Retro', color: 'bg-amber-50' },
  { id: 'nature', name: 'Nature', color: 'bg-gradient-to-br from-emerald-400 to-green-600' },
  { id: 'ocean', name: 'Ocean', color: 'bg-gradient-to-br from-cyan-400 to-blue-600' },
  { id: 'sunset', name: 'Sunset', color: 'bg-gradient-to-br from-orange-400 to-pink-600' }
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onChange }) => {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="flex items-center gap-1">
        <Palette size={16} className="text-slate-400" />
        <span className="text-sm text-slate-400">Theme:</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`w-6 h-6 rounded-full ${theme.color} flex items-center justify-center 
              transition-all duration-200 ${
                currentTheme === theme.id 
                  ? 'ring-2 ring-indigo-500 ring-offset-1' 
                  : 'hover:ring-1 hover:ring-indigo-300'
              }`}
            title={theme.name}
          >
            {currentTheme === theme.id && (
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;