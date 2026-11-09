import React from 'react';
import { Github, Linkedin, Mail, Terminal, Rss, FileCode } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    if (onNavigate && path.startsWith('/')) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#08080A] pt-14 pb-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200 dark:border-white/5">
          {/* Col 1-2: Brand & Summary */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F52BA] via-[#50C878] to-[#DC143C] p-[1.5px]">
                <div className="w-full h-full bg-white dark:bg-[#0B0B0B] rounded-[6px] flex items-center justify-center">
                  <span className="font-black text-sm bg-gradient-to-r from-[#0F52BA] via-[#50C878] to-[#DC143C] bg-clip-text text-transparent">
                    M
                  </span>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-950 dark:text-white text-sm">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-slate-400 mx-1.5">·</span>
                <span className="text-xs font-mono text-[#0F52BA] dark:text-[#50C878]">
                  {PERSONAL_INFO.role}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Architecting, orchestrating, and deploying autonomous multi-agent systems (LangGraph,
              CrewAI, AutoGen), hybrid vector RAG, and resilient LLM backends.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.email}
                aria-label="Email"
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Primary Routes */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Navigate
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {[
                { label: 'Home Overview', path: '/' },
                { label: 'Case Studies (/work)', path: '/work' },
                { label: 'Articles & Research (/writing)', path: '/writing' },
                { label: 'About & Stack (/about)', path: '/about' },
                { label: 'Interactive CV (/resume)', path: '/resume' },
                { label: 'Hire / Contact (/contact)', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    className="hover:text-[#0F52BA] dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: AI & Engineering Signal Pages */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              AI &amp; Architecture
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {[
                { label: 'Ask My AI (/ai)', path: '/ai' },
                { label: 'Colophon & System Design (/colophon)', path: '/colophon' },
                { label: 'Hardware & Stack (/uses)', path: '/uses' },
                { label: 'Current Focus (/now)', path: '/now' },
                { label: 'Global Search (/search)', path: '/search' },
                { label: 'Admin & Metrics (/admin)', path: '/admin' },
              ].map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    className="hover:text-[#0F52BA] dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Machine-Readable Endpoints */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Agent &amp; Web Feeds
            </div>
            <ul className="space-y-2 text-xs font-mono text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#50C878] transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#0F52BA]" />
                  <span>/llms.txt</span>
                </a>
              </li>
              <li>
                <a
                  href="/llms-full.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#50C878] transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#50C878]" />
                  <span>/llms-full.txt</span>
                </a>
              </li>
              <li>
                <a
                  href="/mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#50C878] transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#DC143C]" />
                  <span>/mcp (JSON-RPC 2.0)</span>
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#50C878] transition-colors"
                >
                  <Rss className="w-3.5 h-3.5 text-amber-400" />
                  <span>/rss.xml &amp; /sitemap.xml</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Colophon Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name} ({PERSONAL_INFO.formalName}). Open
            Source (MIT / Apache-2.0).
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Next.js / React · TypeScript · Three.js PBR · Hybrid RAG + MCP
          </p>
        </div>
      </div>
    </footer>
  );
};
