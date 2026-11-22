import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-emerald-200 shadow-2xl transition-all duration-300 animate-slide-up">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-[#B86B43] shrink-0" />}
      <span className="text-xs font-bold text-[#1E1C1A]">{toast.message}</span>
    </div>
  );
};
