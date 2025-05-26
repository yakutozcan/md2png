import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | null;

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    if (type) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  if (!type) return null;

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`${bgColor} ${borderColor} ${textColor} border-l-4 p-4 rounded shadow-lg flex items-start gap-2 max-w-md`}>
        <Icon size={18} className="mt-0.5 flex-shrink-0" />
        <p className="flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;