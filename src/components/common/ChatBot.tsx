import React, { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

type ChatRole = 'user' | 'model';

interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
}

interface TypingJob {
  id: number;
  content: string;
}

const strings = {
  en: {
    open: 'Ask about David',
    close: 'Close chat',
    title: 'David’s portfolio assistant',
    subtitle: 'Ask about experience, projects, or skills',
    intro: 'Hello! I can answer questions about David’s experience, projects, and technical skills.',
    input: 'Write your question…',
    send: 'Send message',
    loading: 'Preparing an answer…',
    offline: 'You appear to be offline. Check your connection and try again.',
    unavailable: 'Chat is not configured yet. Please use the contact details on the portfolio.',
    rateLimit: 'Too many requests. Please wait a moment before trying again.',
    server: 'The assistant is temporarily unavailable. Please try again shortly.',
    generic: 'Something went wrong. Please try again.',
    suggestions: [
      'Summarize the HealthKicks IoT project',
      'What is David’s experience with Angular and Spring Boot?',
      'Is David available, and how can I contact him?',
    ],
  },
  fr: {
    open: 'Poser une question sur David',
    close: 'Fermer la conversation',
    title: 'Assistant du portfolio de David',
    subtitle: 'Expérience, projets et compétences',
    intro: 'Bonjour ! Je peux répondre à vos questions sur le parcours, les projets et les compétences techniques de David.',
    input: 'Écrivez votre question…',
    send: 'Envoyer le message',
    loading: 'Préparation de la réponse…',
    offline: 'Vous semblez hors ligne. Vérifiez votre connexion puis réessayez.',
    unavailable: 'Le chat n’est pas encore configuré. Vous pouvez utiliser les coordonnées du portfolio.',
    rateLimit: 'Trop de requêtes. Veuillez patienter avant de réessayer.',
    server: 'L’assistant est temporairement indisponible. Réessayez dans un instant.',
    generic: 'Une erreur est survenue. Veuillez réessayer.',
    suggestions: [
      'Résume le projet IoT HealthKicks',
      'Quelle est l’expérience de David avec Angular et Spring Boot ?',
      'David est-il disponible et comment le contacter ?',
    ],
  },
} as const;

const endpoint = import.meta.env.VITE_CHATBOT_API_URL?.trim();
const chatUrl = endpoint
  ? `${endpoint.replace(/\/+$/, '').replace(/\/api\/chat$/, '')}/api/chat`
  : '';

export const ChatBot: React.FC = () => {
  const { lang } = useLanguage();
  const copy = strings[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingJob, setTypingJob] = useState<TypingJob | null>(null);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogWasOpen = useRef(false);
  const nextId = useRef(0);
  const busy = isLoading || typingJob !== null;

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), textarea:not([disabled])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleDialogKeys);
    return () => document.removeEventListener('keydown', handleDialogKeys);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      dialogWasOpen.current = true;
    } else if (dialogWasOpen.current) {
      dialogWasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!typingJob) return;
    let offset = 0;
    let timer = 0;

    const revealNextChunk = () => {
      offset = Math.min(offset + 5, typingJob.content.length);
      setMessages((current) =>
        current.map((message) =>
          message.id === typingJob.id
            ? { ...message, content: typingJob.content.slice(0, offset) }
            : message
        )
      );
      if (offset < typingJob.content.length) {
        timer = window.setTimeout(revealNextChunk, 16);
      } else {
        setTypingJob(null);
      }
    };

    timer = window.setTimeout(revealNextChunk, 16);
    return () => window.clearTimeout(timer);
  }, [typingJob]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: typingJob ? 'auto' : 'smooth' });
  }, [messages, isLoading, error, typingJob]);

  const submitMessage = async (value: string) => {
    const message = value.trim();
    if (!message || busy) return;

    setError('');
    setInput('');
    const userMessage: ChatMessage = { id: nextId.current++, role: 'user', content: message };
    setMessages((current) => [...current, userMessage]);

    if (!isOnline) {
      setError(copy.offline);
      return;
    }
    if (!chatUrl) {
      setError(copy.unavailable);
      return;
    }

    setIsLoading(true);
    try {
      const history = messages
        .slice(-maxHistoryMessages)
        .map(({ role, content }) => ({ role, content }));
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
      });

      if (response.status === 429) {
        setError(copy.rateLimit);
        return;
      }
      if (!response.ok) {
        setError(response.status >= 500 ? copy.server : copy.generic);
        return;
      }

      const result: unknown = await response.json();
      if (
        typeof result !== 'object' ||
        result === null ||
        !('reply' in result) ||
        typeof result.reply !== 'string' ||
        !result.reply.trim()
      ) {
        setError(copy.generic);
        return;
      }

      const id = nextId.current++;
      setMessages((current) => [...current, { id, role: 'model', content: '' }]);
      setTypingJob({ id, content: result.reply.trim() });
    } catch {
      setError(isOnline ? copy.server : copy.offline);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-end sm:pointer-events-none sm:inset-auto sm:bottom-24 sm:right-6">
          <div
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/40 sm:hidden"
          />
          <div
            ref={panelRef}
            id="portfolio-chat-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-chat-title"
            className="pointer-events-auto relative z-10 flex h-[min(100dvh,44rem)] w-full flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:h-[min(38rem,calc(100dvh-9rem))] sm:w-[min(26rem,calc(100vw-3rem))] sm:rounded-2xl"
          >
            <header className="flex items-center justify-between gap-3 bg-brand-700 px-4 py-4 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Bot aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 id="portfolio-chat-title" className="truncate font-semibold">{copy.title}</h2>
                  <p className="truncate text-xs text-white/80">{copy.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={copy.close}
                className="rounded-lg p-2 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            <div
              className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950/60"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
              aria-label={copy.title}
            >
              <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {copy.intro}
              </div>

              {messages.length === 0 && (
                <div className="flex flex-col items-start gap-2" aria-label={lang === 'fr' ? 'Suggestions' : 'Suggested questions'}>
                  {copy.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void submitMessage(suggestion)}
                      disabled={busy}
                      className="max-w-full rounded-xl border border-brand-600/30 bg-white px-3 py-2 text-left text-xs text-brand-700 transition hover:border-brand-600 hover:bg-brand-50 disabled:opacity-50 dark:bg-slate-900 dark:text-brand-300 dark:hover:bg-slate-800"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'ml-auto rounded-tr-sm bg-brand-700 text-white'
                      : 'rounded-tl-sm border border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                  }`}
                >
                  {message.content}
                </div>
              ))}

              {isLoading && (
                <div className="flex max-w-[90%] items-center gap-2 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800" role="status">
                  <span className="sr-only">{copy.loading}</span>
                  <div className="w-40 space-y-2" aria-hidden="true">
                    <span className="block h-2 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <span className="block h-2 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    <span className="block h-2 w-3/5 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
              )}

              {error && (
                <p role="alert" className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200">
                  {error}
                </p>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              className="border-t border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
              onSubmit={(event) => {
                event.preventDefault();
                void submitMessage(input);
              }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      void submitMessage(input);
                    }
                  }}
                  placeholder={copy.input}
                  aria-label={copy.input}
                  rows={1}
                  maxLength={1200}
                  disabled={busy}
                  className="max-h-28 min-h-11 flex-1 resize-y rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label={copy.send}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'fr' ? 'Entrée pour envoyer · Maj+Entrée pour une nouvelle ligne' : 'Enter to send · Shift+Enter for a new line'}
              </p>
            </form>
          </div>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? copy.close : copy.open}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat-dialog"
        className={`fixed bottom-24 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
          isOpen ? 'scale-0 opacity-0' : 'animate-pulse motion-reduce:animate-none'
        }`}
      >
        {isOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <MessageCircle aria-hidden="true" className="h-6 w-6" />}
      </button>
    </>
  );
};

const maxHistoryMessages = 8;
