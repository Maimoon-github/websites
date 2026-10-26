import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { JOURNAL_ARTICLES } from '@/lib/homepage-data';

export function JournalSection() {
  return (
    <section id="journal" aria-labelledby="journal-heading" className="max-w-[1360px] mx-auto px-6 pt-20">
      <div className="flex justify-between items-end gap-4 flex-wrap mb-[22px]">
        <h2
          id="journal-heading"
          className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
        >
          The hair{' '}
          <span className="font-display italic text-raka-copper-deep">journal</span>
        </h2>
        <Link
          href="/journal"
          className="text-[14px] font-bold text-raka-copper-deep hover:text-raka-ink py-2.5 transition-colors no-underline"
        >
          All articles
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
        {JOURNAL_ARTICLES.map((article) => (
          <Link
            key={article.title}
            href={article.href || '/journal'}
            className="rk-card flex flex-col gap-3 no-underline text-raka-ink group"
          >
            <div className="rounded-card overflow-hidden aspect-[4/3] relative bg-raka-sand">
              <Image
                src={article.img}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-raka-copper-deep">
              {article.tag}
            </span>
            <span className="text-[19px] font-bold leading-[1.3] text-raka-ink group-hover:text-raka-copper-deep transition-colors">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
