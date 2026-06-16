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
    { label: lang === 'tr' ? "YILLIK GÜNEŞ ÜRETİMİ" : lang === 'ro' ? "TOTAL FOTOVOLTAIC" : lang === 'ru' ? "ФОТОЭЛЕКТРИЧЕСКАЯ МОЩНОСТЬ" : "CALCULATED PV CAPACITY", value: "25 MWp", desc: lang === 'tr' ? "41.664 Premium Panel" : lang === 'ro' ? "41.664 de Module Premium" : lang === 'ru' ? "41 664 премиум-панелей" : "41,664 Premium Modules", icon: Sun, color: "text-[#f59e0b]" },
    { label: lang === 'tr' ? "GÜVENCELİ ARAZİ" : lang === 'ro' ? "TEREN ASIGURAT" : lang === 'ru' ? "ОБЩАЯ ПЛОЩАДЬ ЗЕМЛИ" : "SECURED MUNICIPAL LAND", value: "31 Hectare", desc: lang === 'tr' ? "49 Yıllık Superficie Sözleşmesi" : lang === 'ro' ? "Superficie pe 49 de Ani" : lang === 'ru' ? "Суперфиций на 49 лет" : "49 Years Lease Contract", icon: MapPin, color: "text-emerald-500" },
    { label: lang === 'tr' ? "BAĞLANTI MALİYETİ" : lang === 'ro' ? "RACORD LA RETEA APROBAT" : lang === 'ru' ? "ОЦЕНКА ПОДКЛЮЧЕНИЯ" : "APPROVED CONNECTION TARIFF", value: "€21M", desc: lang === 'tr' ? "Şebeke güçlendirme masrafı yok" : lang === 'ro' ? "Fără întăriri necesare de rețea" : lang === 'ru' ? "Усиление сетей не требуется" : "No system reinforcement requested", icon: DollarSign, color: "text-sky-400" }
  ];

  const handleLanguageChange = (selectedLang: Language) => {
    setLang(selectedLang);
  };

  return (
    <div className="bg-brand-bg text-slate-800 min-h-screen selection:bg-brand-blue selection:text-white hero-gradient font-sans w-full relative pt-18">
      {/* Dynamic Navigation Fixed Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="font-extrabold font-sans text-sm sm:text-lg tracking-tight">C</span>
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-lg text-slate-900 tracking-tight font-sans block">Cârligele BESS</span>
              <span className="text-[10px] text-brand-gold font-mono font-bold uppercase tracking-wider hidden sm:block">
                {lang === 'tr' ? '€21M Onaylı Şebeke Bağlantısı' : lang === 'ro' ? 'Racord la Rețea Aprobat de €21M' : lang === 'ru' ? 'Одобренное техприсоединение на €21 млн' : '€21M Approved Grid Connection'}
              </span>
              <span className="text-[9px] text-brand-gold font-mono font-bold uppercase tracking-wider block sm:hidden">
                {lang === 'tr' ? '€21M ATR' : lang === 'ro' ? '€21M ATR' : lang === 'ru' ? '€21M TCO' : '€21M ATR'}
              </span>
            </div>
          </div>

          {/* Nav menu links desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 font-mono">
            <a href="#overview" className="hover:text-slate-900 transition-colors">{t.navOverview}</a>
            <a href="#deck" className="hover:text-slate-900 transition-colors">{t.navDeck}</a>
            <a href="#atr" className="hover:text-slate-900 transition-colors">{t.navSpecs}</a>
            <a href="#calculator" className="hover:text-slate-900 transition-colors">{t.navCalculator}</a>
            <a href="#timeline" className="hover:text-slate-900 transition-colors">{t.navTimeline}</a>
          </nav>

          {/* Selector language tab switch */}
          <div className="flex bg-slate-100 p-0.5 sm:p-1 rounded-xl self-center border border-slate-200/80 font-mono text-[9px] sm:text-xs shrink-0 gap-0.5 sm:gap-1">
            {(['tr', 'en', 'ro', 'ru'] as Language[]).map((el) => (
              <button
                key={el}
                onClick={() => handleLanguageChange(el)}
                className={`px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                  lang === el ? 'bg-brand-blue text-white shadow-md font-black' : 'text-slate-600 hover:text-slate-900'
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-200 text-brand-gold text-xs font-mono font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-600" />
              {t.heroBadge}
            </motion.div>

            {/* Display Headings */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              {t.heroTagline}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium"
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
                className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                {t.secondaryAction}
              </a>
            </motion.div>

          </div>

          {/* Stats Bar Matrix Dashboard Card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 glass p-4 sm:p-6 rounded-3xl shadow-xl">
            {statsList.map((stat, index) => (
              <div key={index} className="p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <stat.icon className="w-5 h-5 text-brand-blue" />
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">
                    {stat.label}
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 block leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 font-mono mt-1 block">
                    {stat.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Main Section Content blocks */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12 space-y-16 md:space-y-24">
        
        {/* Section 1: Drone topographies and layout */}
        <section id="overview" className="scroll-mt-24 space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">
              {lang === 'ro' ? 'CAMERA DE DATE VIZUALE' : lang === 'tr' ? 'GÖRSEL VERİ ODASI' : lang === 'ru' ? 'ВИЗУАЛЬНАЯ КОМНАТА ДАННЫХ' : 'VISUAL DATA ROOM'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.sectionOverviewTitle}</h2>
          </div>
          <DroneReconstruction lang={lang} />
        </section>

        {/* Section 2: Slides Pitch deck */}
        <section id="deck" className="scroll-mt-24 space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">
              {lang === 'ro' ? 'REZUMAT EXECUTIV' : lang === 'tr' ? 'YÖNETİCİ ÖZETİ' : lang === 'ru' ? 'КРАТКОЕ ОПИСАНИЕ' : 'EXECUTIVE SUMMARY'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.sectionDeckTitle}</h2>
          </div>
          <DeckSection lang={lang} />
        </section>

        {/* Section 3: Technical ATR document explorer */}
        <section id="atr" className="scroll-mt-24 space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">
              {lang === 'ro' ? 'CONFORMITATE TRANSELECTRICA' : lang === 'tr' ? 'TRANSELECTRICA UYUMLULUK DOSYASI' : lang === 'ru' ? 'СООТВЕТСТВИЕ REGLAMENT TSO' : 'TRANSELECTRICA COMPLIANCE DOSSIER'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.sectionAtrTitle}</h2>
          </div>
          <AtrSection lang={lang} />
        </section>

        {/* Section 4: Investment Arbitrage calculator */}
        <section id="calculator" className="scroll-mt-24 space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">
              {lang === 'ro' ? 'PROIECȚII FINANCIARE' : lang === 'tr' ? 'FİNANSAL PROJEKSİYONLAR' : lang === 'ru' ? 'ФИНАНСОВЫЕ РАСЧЕТЫ' : 'FINANCIAL PROJECTIONS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.sectionCalculatorTitle}</h2>
          </div>
          <InvestmentCalculator lang={lang} />
        </section>

        {/* Section 5: Timeline ROADMAP milestones */}
        <section id="timeline" className="scroll-mt-24 space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">
              {lang === 'ro' ? 'CALENDAR ETAPE DEZVOLTARE' : lang === 'tr' ? 'PROJE GELİŞTİRME TAKVİMİ' : lang === 'ru' ? 'КАЛЕНДАРЬ ЭТАПОВ РАЗРАБОТКИ' : 'DEVELOPMENT STAGE CALENDAR'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.sectionTimelineTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
            {/* Draw a subtle connectors vector bridge */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 hidden lg:block -translate-y-8 z-0" />
            
            {TIMELINE_MILIEUS.map((mil, idx) => (
              <div 
                key={idx} 
                className={`p-5 md:p-6 rounded-3xl glass transition-all duration-300 relative z-10 flex flex-col justify-between h-full space-y-4 hover:border-indigo-300 ${
                  mil.highlight ? 'border-indigo-200 bg-indigo-50/50 ring-1 ring-indigo-100/50' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono text-xs font-extrabold">
                      {mil.phase}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                      {mil.dates}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">{mil[lang].title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-mono mt-1">{mil[lang].desc}</p>
                </div>

                {mil.highlight && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-blue text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> {lang === 'ro' ? 'STADIU RTB (PREGĂTIT CONSTRUCȚIE)' : lang === 'tr' ? 'İNŞAATA HAZIR STATÜ' : lang === 'ru' ? 'СТАТУС ГОТОВНОСТИ (RTB)' : 'READY-TO-BUILD STATUS'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Contact Deal inquiry and NDA forms */}
        <section id="contact" className="scroll-mt-24 space-y-6 md:space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-gold font-mono block mb-1">
              {lang === 'ro' ? 'SOLICITĂRI TRANZACȚIE M&A ȘI NDA' : lang === 'tr' ? 'M&A YATIRIM SORGUSU & NDA ODALARI' : lang === 'ru' ? 'ЗАПРОСЫ НА СДЕЛКУ И NDA' : 'M&A DEAL INQUIRY & NDA ROOMS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{t.contactTitle}</h2>
            <p className="text-slate-650 text-xs sm:text-sm max-w-xl mt-1 font-medium">{t.contactSubtitle}</p>
          </div>
          <InquiryForm lang={lang} />
        </section>

      </main>

      {/* Beautiful High-Contrast Footer links */}
      <footer className="bg-slate-950 text-slate-400 border-t border-white/5 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold">C</div>
            <span className="font-bold text-white font-display">Cârligele BESS Portfolio</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-500">© 2026 {lang === 'ro' ? 'Servicii pentru Investitori' : lang === 'tr' ? 'Yatırımcı Hizmetleri' : lang === 'ru' ? 'Инвестиционные услуги' : 'Investor Services'}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="mailto:suat@duck.com" className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> suat@duck.com
            </a>
            <a href="https://t.me/akilion" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8] transition-colors flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" /> {lang === 'tr' ? '@akilion Doğrudan Telegram' : lang === 'ro' ? '@akilion Contact Direct Telegram' : lang === 'ru' ? '@akilion Прямой контакт в Telegram' : '@akilion Direct Telegram'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
