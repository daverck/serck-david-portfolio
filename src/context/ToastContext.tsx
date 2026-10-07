import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { Check } from 'lucide-react';

interface ToastData {
  message: string;
  detail?: string;
}

interface ToastContextType {
  copyEmail: (e?: React.MouseEvent) => Promise<boolean>;
  copyPhone: (e?: React.MouseEvent) => Promise<boolean>;
  isEmailCopied: boolean;
  isPhoneCopied: boolean;
  showToast: (message: string, detail?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const { resume, t } = useLanguage();
  const timerRef = useRef<number | null>(null);
  const emailTimerRef = useRef<number | null>(null);
  const phoneTimerRef = useRef<number | null>(null);

  const showToast = useCallback((message: string, detail?: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setToast({ message, detail });
    timerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.warn('Could not copy to clipboard', err);
    }
    return success;
  }, []);

  const copyEmail = useCallback(async (_e?: React.MouseEvent) => {
    const email = resume.basics.email;
    const success = await copyToClipboard(email);
    if (success) {
      setIsEmailCopied(true);
      showToast(t('contact.copiedToast'), email);
      if (emailTimerRef.current) window.clearTimeout(emailTimerRef.current);
      emailTimerRef.current = window.setTimeout(() => {
        setIsEmailCopied(false);
      }, 3000);
    }
    return success;
  }, [copyToClipboard, resume.basics.email, showToast, t]);

  const copyPhone = useCallback(async (_e?: React.MouseEvent) => {
    const phone = resume.basics.phone;
    const success = await copyToClipboard(phone);
    if (success) {
      setIsPhoneCopied(true);
      showToast(t('contact.copiedPhoneToast'), phone);
      if (phoneTimerRef.current) window.clearTimeout(phoneTimerRef.current);
      phoneTimerRef.current = window.setTimeout(() => {
        setIsPhoneCopied(false);
      }, 3000);
    }
    return success;
  }, [copyToClipboard, resume.basics.phone, showToast, t]);

  return (
    <ToastContext.Provider value={{ copyEmail, copyPhone, isEmailCopied, isPhoneCopied, showToast }}>
      {children}
      {/* Global Accessible Floating Toast (positioned above BackToTop button) */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 shadow-2xl border border-slate-700/60 dark:border-slate-200/60 backdrop-blur-md animate-fade-in text-xs sm:text-sm font-medium transition-all"
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold">{toast.message}</span>
            {toast.detail && (
              <span className="text-[11px] opacity-80 font-mono">{toast.detail}</span>
            )}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
