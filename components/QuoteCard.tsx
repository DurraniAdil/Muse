
import React from 'react';
import { Collection } from '../types';
// Quote import removed

interface QuoteCardProps {
  content: string;
  collection: Collection;
  id?: string;
  isSquare?: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ content, collection, id = 'quote-preview', isSquare = true }) => {

  // Font scaling logic: long poems adjust to fit, min size is ~12pt (text-base)
  const getFontSizeClass = (text: string) => {
    const len = text.length;
    if (len === 0) return 'text-4xl md:text-5xl';
    if (len < 60) return 'text-3xl md:text-4xl';
    if (len < 150) return 'text-2xl md:text-3xl';
    if (len < 300) return 'text-xl md:text-2xl';
    if (len < 600) return 'text-lg md:text-xl';
    if (len < 1000) return 'text-base md:text-lg';
    if (len < 1500) return 'text-sm md:text-base';
    if (len < 2000) return 'text-xs md:text-sm';
    if (len < 2500) return 'text-[9px] md:text-xs';
    if (len < 3000) return 'text-[8px] md:text-[9px]';
    return 'text-[7px] md:text-[8px]'; // Smallest for very long text
  };

  const fontSizeClass = getFontSizeClass(content);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* outer sheet */}
      <div id={id} className="bg-[#FFF7ED] border border-[#E3D2BF] rounded-2xl shadow-[0_18px_40px_rgba(148,81,40,0.12)] overflow-hidden transition-all duration-500">
        {/* inner margin */}
        <div className="relative m-3 md:m-4 h-full rounded-[1.4rem] border border-[#ECD7C4]/70 bg-[#FFFDF8] overflow-hidden">
          {/* left “margin line” like a notebook */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E5C1A2]/70 to-transparent pointer-events-none" />

          {/* top folio header */}
          <div className="relative flex items-center justify-between px-6 md:px-10 pr-6 md:pr-8 pt-4 md:pt-6 pb-2 md:pb-3 text-[9px] uppercase tracking-[0.28em] text-[#A37754] font-serif">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D88A4A]" />
              <span>Archive of the Self</span>
            </span>
            <span className="opacity-70">Folio – {collection.id}</span>
          </div>

          {/* main quote area */}
          <div
            className={`
            relative
            ${isSquare ? 'aspect-square' : 'aspect-[4/5]'}
            w-full flex items-center justify-center
            px-6 md:px-10 md:px-14 pb-10 md:pb-14 pt-4
            text-center select-none
          `}
            style={{ backgroundColor: collection.background }}
          >
            {/* subtle inner frame driven by primary color */}
            <div
              className="pointer-events-none absolute inset-3 md:inset-6 rounded-[1.1rem] border border-current/25"
              style={{ color: collection.primary }}
            />

            {/* corner ticks */}
            <div
              className="absolute left-5 md:left-9 top-5 md:top-10 w-6 h-6 border-t-[1.5px] border-l-[1.5px] opacity-40"
              style={{ borderColor: collection.primary }}
            />
            <div
              className="absolute right-5 md:right-9 bottom-5 md:bottom-10 w-6 h-6 border-b-[1.5px] border-r-[1.5px] opacity-40"
              style={{ borderColor: collection.primary }}
            />

            {/* the text block */}
            <div className="relative z-10 w-full flex items-center justify-center">
              <div
                className={`
                w-full max-w-[80%]
                quote-content
                ${fontSizeClass}
                ${collection.fontClass || 'font-serif-quote'}
                leading-relaxed
              `}
                style={{ color: collection.text }}
                dangerouslySetInnerHTML={{
                  __html: content || 'Escribe tus pensamientos...'
                }}
              />
            </div>
          </div>

          {/* footer imprint */}
          <div className="border-t border-[#E8D3C0]/80 px-6 md:px-10 py-3 md:py-4 flex flex-col items-center gap-1.5 bg-[#FFF8EF]/80">
            <div className="flex items-center gap-2 text-[#B3774C]">
              <span className="h-px w-8 bg-current/40" />
              <span className="w-2 h-2 rotate-45 border border-current/70" />
              <span className="h-px w-8 bg-current/40" />
            </div>
            <span
              className="text-[9px] tracking-[0.32em] font-serif uppercase text-[#74412A]"
            >
              Archive of the Self
            </span>
            <span
              className="text-[8px] tracking-[0.26em] font-serif italic text-[#9B6745]"
            >
              durrani.hw
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuoteCard;