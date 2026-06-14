/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, FileSpreadsheet, BatteryCharging, ShieldCheck, Milestone, Compass } from 'lucide-react';
import { Language } from '../types';
import { DECK_SLIDES, TRANSLATIONS } from '../data';

interface DeckSectionProps {
  lang: Language;
}

export default function DeckSection({ lang }: DeckSectionProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = DECK_SLIDES[currentSlideIndex];
  const t = TRANSLATIONS[lang];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % DECK_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + DECK_SLIDES.length) % DECK_SLIDES.length);
  };

  // Get active local content
  const slideContent = slide[lang];

  return (
    <div className="glass rounded-3xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* Slide Canvas Cover */}
        <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[300px] lg:min-h-[480px] bg-slate-900 group">
          <img 
            src={slide.image} 
            alt={slideContent.title}
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          {/* Deck page index */}
          <div className="absolute top-6 left-6 bg-slate-950/90 border border-slate-700/80 px-3 py-1.5 rounded-xl font-mono text-[10px] text-brand-gold font-bold">
            {t.slideOf} · {currentSlideIndex + 1} / {DECK_SLIDES.length}
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <h4 className="text-xl md:text-2xl font-black font-sans text-white tracking-tight drop-shadow-md leading-none">
              {slideContent.title}
            </h4>
            <span className="text-xs md:text-base font-bold text-amber-500 font-mono tracking-wide mt-1 block">
              {slideContent.subtitle}
            </span>
          </div>
        </div>

        {/* Slide Texts & Details */}
        <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlideIndex}-${lang}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: -15, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {slideContent.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-slate-700 text-sm leading-relaxed font-semibold">
                    {p}
                  </p>
                ))}

                {/* Bullets if any */}
                {slideContent.bullets && slideContent.bullets.length > 0 && (
                  <ul className="space-y-2 border-t border-slate-100 pt-4">
                    {slideContent.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-755">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-brand-gold rounded-full shrink-0" />
                        <span className="font-extrabold text-slate-800">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Navigation Slideshow Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex items-center gap-1.5">
              {DECK_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                    currentSlideIndex === idx ? 'w-6 bg-brand-blue' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-24 h-10 btn-primary text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-md"
                aria-label="Next slide"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
