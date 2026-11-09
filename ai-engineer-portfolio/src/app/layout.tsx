import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: 'Maimoon (Moon) Amin | Agentic AI Engineer — LLM, RAG & Multi-Agent Systems',
  description:
    'Portfolio of Maimoon (Moon) Amin (M. Maimoon) — Agentic AI Engineer specializing in LangGraph, CrewAI, AutoGen, hybrid RAG (Qdrant, Pinecone, Milvus), vLLM/Ollama inference, and full-stack AI systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
