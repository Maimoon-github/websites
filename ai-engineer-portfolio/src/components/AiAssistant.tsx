import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  ExternalLink,
  Maximize2,
  Calendar,
  Layers,
} from 'lucide-react';
import { ChatMessage, RetrievedSource } from '../types/portfolio';
import { PERSONAL_INFO } from '../data/portfolioData';

const SUGGESTED_PROMPTS = [
  'Tell me about Agentic-Review-Architecture',
  'How does AI-Learning-Career-Coach use LangGraph & CrewAI?',
  'What vector databases & LLM stacks does Maimoon use?',
  'Is Maimoon available for remote AI engineering roles?',
];

interface AiAssistantProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
  initialPrompt?: string;
  contextScope?: string;
  onClearContextScope?: () => void;
  onNavigate?: (path: string) => void;
  isFullPage?: boolean;
}

/**
 * Helper to render markdown-like inline citations `[Source: Title](/url)` and bold text `**...**`
 */
const FormattedMessageText: React.FC<{
  text: string;
  onNavigate?: (path: string) => void;
}> = ({ text, onNavigate }) => {
  // Split on `[Source: ...](...)` or general `[...](...)` links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    const idx = match.index;
    parts.push(
      <a
        key={`${url}-${idx}`}
        href={url}
        onClick={(e) => {
          if (url.startsWith('/') && onNavigate) {
            e.preventDefault();
            onNavigate(url);
          }
        }}
        className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-md bg-[#0F52BA]/15 dark:bg-[#0F52BA]/25 text-[#0F52BA] dark:text-blue-300 border border-[#0F52BA]/30 font-mono text-[11px] hover:underline"
      >
        <span>{label}</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <div className="whitespace-pre-line leading-relaxed">{parts}</div>;
};

export const AiAssistant: React.FC<AiAssistantProps> = ({
  externalOpen,
  onExternalClose,
  initialPrompt,
  contextScope,
  onClearContextScope,
  onNavigate,
  isFullPage = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isFullPage);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi! I'm ${PERSONAL_INFO.shortName}'s citation-grounded RAG assistant. Ask me about his multi-agent systems (Agentic-Review-Architecture, AI-Learning-Career-Coach), hybrid RAG & MCP architecture, or technical skills!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedSourcesMsgId, setExpandedSourcesMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastHandledPromptRef = useRef<string>('');

  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [externalOpen]);

  useEffect(() => {
    if (initialPrompt && initialPrompt !== lastHandledPromptRef.current) {
      lastHandledPromptRef.current = initialPrompt;
      setIsOpen(true);
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const assistantMessageId = `model-${Date.now() + 1}`;
    const placeholderAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'model',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
    };

    const updatedHistory = [...messages, userMessage];
    setMessages([...updatedHistory, placeholderAssistantMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory.map((m) => ({ role: m.role, text: m.text })),
          contextScope,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to connect to assistant');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let retrievedSources: RetrievedSource[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkStr = decoder.decode(value, { stream: true });
        const lines = chunkStr.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (!dataStr) continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.sources) {
                retrievedSources = parsed.sources;
              }
              if (parsed.text) {
                accumulatedText += parsed.text;
              }
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMessageId
                    ? {
                        ...m,
                        text: accumulatedText,
                        sources: retrievedSources.length > 0 ? retrievedSources : m.sources,
                      }
                    : m
                )
              );
            } catch {
              // Ignore partial JSON chunks
            }
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                text:
                  accumulatedText ||
                  `You can reach ${PERSONAL_INFO.name} directly at ${PERSONAL_INFO.email}.`,
                isStreaming: false,
                sources: retrievedSources,
              }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                text: `${PERSONAL_INFO.name} specializes in LangGraph, CrewAI, AutoGen, Qdrant/Pinecone/Milvus RAG, and Django/FastAPI backends. Contact him at ${PERSONAL_INFO.email} (/contact).`,
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, rating: 'up' | 'down', comment?: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, feedback: rating } : m))
    );
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, rating, comment }),
      });
    } catch {
      // Ignore network error for telemetry
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: `Hi! I'm ${PERSONAL_INFO.shortName}'s citation-grounded RAG assistant. Ask me about his multi-agent systems (Agentic-Review-Architecture, AI-Learning-Career-Coach), hybrid RAG & MCP architecture, or technical skills!`,
        timestamp: 'Just now',
      },
    ]);
  };

  const renderMessageList = () => (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
      {/* Context Scope Banner if Scoped to a Specific Case Study or Essay */}
      {contextScope && (
        <div className="p-2.5 rounded-xl bg-[#0F52BA]/15 border border-[#0F52BA]/40 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-800 dark:text-blue-200 font-mono truncate">
            <Layers className="w-3.5 h-3.5 text-[#50C878] shrink-0" />
            <span className="truncate">Scoped Context: {contextScope}</span>
          </div>
          {onClearContextScope && (
            <button
              type="button"
              onClick={onClearContextScope}
              className="text-[11px] font-mono text-slate-500 hover:text-white shrink-0 cursor-pointer"
            >
              Clear Scope
            </button>
          )}
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs sm:text-sm ${
              msg.role === 'user'
                ? 'bg-[#0F52BA] text-white rounded-br-xs shadow-md'
                : 'bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 rounded-bl-xs'
            }`}
          >
            {msg.text ? (
              <FormattedMessageText text={msg.text} onNavigate={onNavigate} />
            ) : (
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F52BA] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-bounce [animation-delay:300ms]" />
              </span>
            )}
          </div>

          {/* Assistant Message Footer: Retrieved Sources Drawer Toggle & Feedback */}
          {msg.role === 'model' && !msg.isStreaming && msg.id !== 'welcome' && (
            <div className="mt-1.5 flex flex-wrap items-center gap-3 px-1">
              {msg.sources && msg.sources.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSourcesMsgId(expandedSourcesMsgId === msg.id ? null : msg.id)
                  }
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-[#0F52BA] dark:text-[#50C878] hover:underline cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>
                    {expandedSourcesMsgId === msg.id
                      ? 'Hide Retrieved Chunks'
                      : `${msg.sources.length} Retrieved RAG Sources`}
                  </span>
                </button>
              )}

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFeedback(msg.id, 'up')}
                  aria-label="Helpful response"
                  className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer ${
                    msg.feedback === 'up' ? 'text-[#50C878]' : 'text-slate-400'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedback(msg.id, 'down')}
                  aria-label="Unhelpful response"
                  className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer ${
                    msg.feedback === 'down' ? 'text-[#DC143C]' : 'text-slate-400'
                  }`}
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Collapsible Retrieved Sources List */}
          {msg.role === 'model' &&
            msg.sources &&
            expandedSourcesMsgId === msg.id && (
              <div className="mt-2 w-full max-w-[92%] p-3 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Top-K Hybrid RRF Retrieved Chunks
                </div>
                {msg.sources.map((src) => (
                  <div
                    key={src.id}
                    onClick={() => onNavigate && onNavigate(src.url)}
                    className="p-2.5 rounded-lg bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-[#0F52BA] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                      <span className="truncate">{src.title}</span>
                      <span className="text-[10px] font-mono text-[#50C878] shrink-0 ml-2">
                        RRF {src.score}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                      {src.snippet}
                    </p>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}

      {/* Quick Prompt Chips */}
      <div className="pt-2 flex flex-col gap-1.5">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          Suggested Architecture &amp; Hiring Queries:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              disabled={isLoading}
              className="text-left px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-[#0F52BA]/15 text-xs text-slate-700 dark:text-slate-300 hover:text-[#0F52BA] dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-[#0F52BA]/40 transition-all cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );

  /* Full-Page /ai Dedicated View */
  if (isFullPage) {
    return (
      <section className="pt-28 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0F52BA] dark:text-[#50C878] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hybrid RRF Retrieval · Inline Citations · MCP Ready</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Ask Maimoon’s AI Portfolio Twin
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Grounded strictly on verified case studies, technical essays, and CV chunks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetChat}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Session</span>
            </button>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#0F52BA] hover:bg-blue-600 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Call</span>
              </button>
            )}
          </div>
        </div>

        <div className="h-[640px] rounded-3xl bg-white dark:bg-[#101014] border border-slate-200 dark:border-white/15 shadow-xl flex flex-col overflow-hidden">
          {renderMessageList()}

          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0B0E] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Agentic-Review-Architecture, AI-Learning-Career-Coach, skills, or availability..."
              aria-label="Ask AI Portfolio Assistant"
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0F52BA]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send question"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#0F52BA] to-[#50C878] text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>
    );
  }

  /* Persistent Floating Widget Mode */
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end no-print">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="mb-3 w-[345px] sm:w-[400px] h-[510px] rounded-2xl bg-white/95 dark:bg-[#101014]/95 border border-slate-200 dark:border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Widget Header */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-[#16161C] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F52BA] via-[#50C878] to-[#DC143C] flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-950 dark:text-white tracking-wide">
                    AI Portfolio Assistant
                  </h3>
                  <span className="text-[10px] text-[#50C878] font-mono block">
                    Hybrid RAG · Inline Citations
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('/ai');
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Expand to full-page /ai view"
                    aria-label="Expand to full page AI view"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetChat}
                  className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onExternalClose?.();
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Minimize assistant"
                  aria-label="Minimize assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {renderMessageList()}

            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0B0E] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, skills, or hiring..."
                aria-label="Ask AI Portfolio Assistant"
                className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0F52BA]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#0F52BA] to-[#50C878] text-white flex items-center justify-center disabled:opacity-40 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          if (!next) onExternalClose?.();
        }}
        aria-label={isOpen ? 'Close AI Portfolio Assistant' : 'Open AI Portfolio Assistant'}
        className="w-13 h-13 rounded-full bg-gradient-to-br from-[#0F52BA] via-[#1b6ec2] to-[#50C878] text-white shadow-[0_0_25px_rgba(15,82,186,0.65)] hover:scale-105 transition-transform flex items-center justify-center border border-white/20 cursor-pointer"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>
    </div>
  );
};
