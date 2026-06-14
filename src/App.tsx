/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Battery, 
  Sun, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  ExternalLink,
  Milestone,
  Grid,
  Map,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

import { Language } from './types';
import { TRANSLATIONS, TIMELINE_MILIEUS } from './data';
import DroneReconstruction from './components/DroneReconstruction';
import InvestmentCalculator from './components/InvestmentCalculator';
import InquiryForm from './components/InquiryForm';
import DeckSection from './components/DeckSection';
import AtrSection from './components/AtrSection';

export default function App() {
  const [lang, setLang] = useState<Language>('tr');
  const t = TRANSLATIONS[lang];

  // Quick stats computed or defined
  const statsList = [
    { label: lang === 'tr' ? "BESS TOPLAM GÜCÜ" : lang === 'ro' ? "PUTERE TOTALĂ BESS" : lang === 'ru' ? "ОБЩАЯ МОЩНОСТЬ BESS" : "TOTAL BESS POWER", value: "300 MW", desc: "2 × 150 MW BESS", icon: Battery, color: "text-brand-gold" },
    { label: lang === 'tr' ? "YILLIK GÜNEŞ ÜRETİMİ" : lang === 'ro' ? "TOTAL FOTOVOLTAIC" : lang === 'ru' ? "ФОТОЭЛЕКТРИЧЕСКАЯ МОЩНОСТЬ" : "CALCULATED PV CAPACITY", value: "25 MWp", desc: "41,664 Premium Modules", icon: Sun, color: "text-[#f59e0b]" },
    { label: lang === 'tr' ? "GÜVENCELİ ARAZİ" : lang === 'ro' ? "TEREN ASIGURAT" : lang === 'ru' ? "ОБЩАЯ ПЛОЩАДЬ ЗЕМЛИ" : "SECURED MUNICIPAL LAND", value: "31 Hectare", desc: "49 Years Lease Contract", icon: MapPin, color: "text-emerald-500" },
    { label: lang === 'tr' ? "BAĞLANTI MALİYETİ" : lang === 'ro' ? "RACORD LA RETEA APROBAT" : lang === 'ru' ? "ОЦЕНКА ПОДКЛЮЧЕНИЯ" : "APPROVED CONNECTION TARIFF", value: "€21M", desc: "No system reinforcement requested", icon: DollarSign, color: "text-sky-400" }
  ];

  const handleLanguageChange = (selectedLang: Language) => {
    setLang(selectedLang);
  };

  return (
    <div className="bg-brand-bg text-slate-200 min-h-screen selection:bg-brand-gold selection:text-slate-950 hero-gradient font-sans">
      {/* Dynamic Navigation Sticky Bar */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <span className="font-extrabold font-display text-lg tracking-tight">C</span>
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight font-display block">Cârligele BESS</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold uppercase tracking-wider block">€21M Approved Grid Connection</span>
            </div>
          </div>

          {/* Nav menu links desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400 font-mono">
            <a href="#overview" className="hover:text-white transition-colors">{t.navOverview}</a>
            <a href="#deck" className="hover:text-white transition-colors">{t.navDeck}</a>
            <a href="#atr" className="hover:text-white transition-colors">{t.navSpecs}</a>
            <a href="#calculator" className="hover:text-white transition-colors">{t.navCalculator}</a>
            <a href="#timeline" className="hover:text-white transition-colors">{t.navTimeline}</a>
          </nav>

          {/* Selector language tab switch */}
          <div className="flex bg-slate-950/60 p-1 rounded-xl self-center border border-white/10 font-mono text-xs">
            {(['tr', 'en', 'ro', 'ru'] as Language[]).map((el) => (
              <button
                key={el}
                onClick={() => handleLanguageChange(el)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                  lang === el ? 'bg-brand-blue text-white shadow-md font-black' : 'text-slate-400 hover:text-white'
                }`}
                aria-label={`Switch language to ${el.toUpperCase()}`}
              >
                {el.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Ready building top banner badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-gold text-xs font-mono font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              {t.heroBadge}
            </motion.div>

            {/* Display Headings */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight"
            >
              {t.heroTagline}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {t.heroDescription}
            </motion.p>

            {/* Core CTA Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
            >
              <a 
                href="#contact" 
                className="w-full sm:w-auto btn-primary text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {t.primaryAction} 
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#atr" 
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-white/5 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {t.secondaryAction}
              </a>
            </motion.div>

          </div>

          {/* Stats Bar Matrix Dashboard Card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 glass p-4 sm:p-6 rounded-3xl shadow-2xl">
            {statsList.map((stat, index) => (
              <div key={index} className="p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`p-2.5 bg-slate-900/60 rounded-xl border border-white/5 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono block">
                    {stat.label}
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-display block leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 font-mono mt-1 block">
                    {stat.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Section Content blocks */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* Section 1: Drone topographies and layout */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">VISUAL DATA ROOM</span>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">Saha Envanteri &amp; Drone Havadan Haritalama</h2>
          </div>
          <DroneReconstruction lang={lang} />
        </section>

        {/* Section 2: Slides Pitch deck */}
        <section id="deck" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">EXECUTIVE SUMMARY</span>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">Proje Detayları &amp; Yatırım Brifingi</h2>
          </div>
          <DeckSection lang={lang} />
        </section>

        {/* Section 3: Technical ATR document explorer */}
        <section id="atr" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">TRANSELECTRICA COMPLIANCE DOSSIER</span>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">Onaylı Teknik Bağlantı Şartları (ATR Verileri)</h2>
          </div>
          <AtrSection lang={lang} />
        </section>

        {/* Section 4: Investment Arbitrage calculator */}
        <section id="calculator" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">FINANCIAL PROJECTIONS</span>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">Arbitraj Rentabilite ve Payback Simülatörü</h2>
          </div>
          <InvestmentCalculator lang={lang} />
        </section>

        {/* Section 5: Timeline ROADMAP milestones */}
        <section id="timeline" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">DEVELOPMENT STAGE CALENDAR</span>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">Proje Geliştirme Takvimi &amp; Mil Taşları</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Draw a subtle connectors vector bridge */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 hidden lg:block -translate-y-8 z-0" />
            
            {TIMELINE_MILIEUS.map((mil, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-3xl glass transition-all duration-300 relative z-10 flex flex-col justify-between h-full space-y-4 hover:border-indigo-500/30 ${
                  mil.highlight ? 'border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/20' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono text-xs font-extrabold">
                      {mil.phase}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 border border-white/5 px-2 py-1 rounded-md">
                      {mil.dates}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-display leading-tight">{mil[lang].title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono mt-1">{mil[lang].desc}</p>
                </div>

                {mil.highlight && (
                  <div className="pt-2 border-t border-white/10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-blue text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> READY-TO-BUILD STATUS
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Contact Deal inquiry and NDA forms */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">M&amp;A DEAL INQUIRY &amp; NDA HOUSES</span>
            <h2 className="text-3xl font-bold text-white font-display tracking-tight">{t.contactTitle}</h2>
            <p className="text-slate-400 text-sm max-w-xl mt-1">{t.contactSubtitle}</p>
          </div>
          <InquiryForm lang={lang} />
        </section>

      </main>

      {/* Beautiful High-Contrast Footer links */}
      <footer className="bg-slate-950 text-slate-400 border-t border-white/5 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold">C</div>
            <span className="font-bold text-white font-display">Cârligele BESS Portfolio</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">© 2026 Investor Services</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="mailto:suat@duck.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> suat@duck.com
            </a>
            <a href="https://t.me/akilion" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8] transition-colors flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> @akilion Direct Telegram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
