/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileSpreadsheet, ShieldAlert, Award, Search, Sparkles, Building, Calendar, Info } from 'lucide-react';
import { Language } from '../types';
import { ATR_DOCUMENTS, TRANSLATIONS } from '../data';

const translateKey = (key: string, lang: Language): string => {
  const dictionary: Record<string, Record<Language, string>> = {
    "Tip IS (Battery Type)": {
      tr: "Batarya Kimya Tipi (Tip IS)",
      en: "Battery Chemistry (Tip IS)",
      ro: "Tipul Bateriei (Tip IS)",
      ru: "Тип АКБ (Tip IS)"
    },
    "Pi IS (Installed Power)": {
      tr: "Kurulu Güç (Pi IS)",
      en: "Installed Power (Pi IS)",
      ro: "Putere Instalată (Pi IS)",
      ru: "Установленная мощность (Pi IS)"
    },
    "Pmax evac IS (Max Evac)": {
      tr: "Maksimum Tahliye Gücü (Pmax evac IS)",
      en: "Max Evacuation Power (Pmax evac IS)",
      ro: "Putere Max Evacuabilă (Pmax evac IS)",
      ru: "Макс. мощность выдачи (Pmax evac IS)"
    },
    "Pmax abs IS (Max Abs)": {
      tr: "Maksimum Çekim Gücü (Pmax abs IS)",
      en: "Max Absorption Power (Pmax abs IS)",
      ro: "Putere Max Absorbită (Pmax abs IS)",
      ru: "Макс. мощность потребления (Pmax abs IS)"
    },
    "Total Max Capacity (Ah)": {
      tr: "Toplam Maksimum Kapasite",
      en: "Total Maximum Capacity",
      ro: "Capacitate Totală Maximă",
      ru: "Общая максимальная емкость"
    },
    "Total Stored Energy": {
      tr: "Toplam Depolanan Enerji",
      en: "Total Stored Energy",
      ro: "Energie Totală Stocată",
      ru: "Запасенная энергия"
    },
    "No. of Inverters": {
      tr: "İnvertör Adedi",
      en: "Count of Inverters",
      ro: "Număr de Invertoare",
      ru: "Количество инверторов"
    },
    "Inverter AC Voltage": {
      tr: "İnvertör AC Çıkış Voltajı",
      en: "Inverter AC Voltage",
      ro: "Tensiune AC Invertor",
      ru: "Напряжение AC инвертора"
    },
    "Inverter Installed Power": {
      tr: "İnvertör Kurulu Gücü",
      en: "Inverter Installed Power",
      ro: "Putere Instalată Invertor",
      ru: "Номинал инвертора"
    },
    "Internal Services Size": {
      tr: "İç Tüketim Yardımcı Gücü",
      en: "Internal Services auxiliary",
      ro: "Servicii Interne",
      ru: "Собственные нужды"
    },
    "GSU Transformer": {
      tr: "Ana GSU Transformatör",
      en: "Grid Step-Up Transformer",
      ro: "Transformator GSU principal",
      ru: "Повышающий трансформатор GSU"
    },
    "Measurement Class": {
      tr: "Ölçüm Doğruluk Sınıfı",
      en: "Metering System Class",
      ro: "Clasă de Măsură Contor",
      ru: "Класс точности учета"
    }
  };

  return dictionary[key]?.[lang] || key;
};

const translateValue = (value: string, lang: Language): string => {
  if (value.includes("Lithium Iron Phosphate")) {
    return {
      tr: "LFP (Lityum Demir Fosfat)",
      en: "LFP (Lithium Iron Phosphate)",
      ro: "LFP (Litiu Fier Fosfat)",
      ru: "LFP (Литий-железо-фосфат)"
    }[lang] || value;
  }
  if (value.includes("Class A")) {
    return {
      tr: "A Sınıfı (SR EN 61050-3-40)",
      en: "Class A (SR EN 61050-3-40)",
      ro: "Clasa A (SR EN 61050-3-40)",
      ru: "Класс А (SR EN 61050-3-40)"
    }[lang] || value;
  }
  if (value.includes("pcs")) {
    return {
      tr: "900 adet (EH-0200-HA-M Modeli)",
      en: "900 pcs (EH-0200-HA-M)",
      ro: "900 bucăți (EH-0200-HA-M)",
      ru: "900 шт (EH-0200-HA-M)"
    }[lang] || value;
  }
  if (value.includes("Total:")) {
    return {
      tr: "200 kW (Toplam: 198.000 kW)",
      en: "200 kW (Total: 198,000 kW)",
      ro: "200 kW (Total: 198.000 kW)",
      ru: "200 кВт (Всего: 198 000 кВт)"
    }[lang] || value;
  }
  return value;
};

interface AtrSectionProps {
  lang: Language;
}

export default function AtrSection({ lang }: AtrSectionProps) {
  const [activeAtrId, setActiveAtrId] = useState<string>('carligele1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const atrDoc = ATR_DOCUMENTS.find(doc => doc.id === activeAtrId) || ATR_DOCUMENTS[0];
  const t = TRANSLATIONS[lang];

  // Helper to filter tables rows
  const filterRows = (rows: Array<{ key: string; value: string }>) => {
    if (!searchQuery) return rows;
    return rows.filter(
      row => 
        row.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredTable1 = filterRows(atrDoc.tables.table1);
  const filteredTable2 = filterRows(atrDoc.tables.table2);

  return (
    <div className="glass rounded-3xl p-6 md:p-8 shadow-xl text-slate-700">
      {/* Tab select menu */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
        <div className="flex overflow-x-auto max-w-full scrollbar-none bg-slate-100 border border-slate-200/80 p-1 rounded-2xl shrink-0 font-mono text-xs gap-1">
          {ATR_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setActiveAtrId(doc.id);
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activeAtrId === doc.id ? 'bg-brand-blue text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              {doc.title}
            </button>
          ))}
        </div>

        {/* Searching field */}
        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-slate-450 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder={t.searchSpecifications}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full rounded-xl px-4 py-2.5 pl-10 text-xs font-medium outline-none transition-all"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeAtrId}-${lang}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: -10, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Official summary card details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 bg-slate-50/50 p-4 rounded-2xl flex items-center gap-3">
              <span className="p-3 bg-brand-blue/10 text-brand-blue rounded-xl">
                <Building className="w-5 h-5 text-indigo-600" />
              </span>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono block font-bold">{t.atrApplicant}</span>
                <span className="text-xs font-bold text-slate-900 block truncate">{atrDoc.applicant}</span>
              </div>
            </div>

            <div className="border border-slate-200 bg-slate-50/50 p-4 rounded-2xl flex items-center gap-3">
              <span className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                <Calendar className="w-5 h-5 text-emerald-700" />
              </span>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono block font-bold">{t.atrIssueDate}</span>
                <span className="text-xs font-bold text-slate-900 block">{atrDoc.regDate}</span>
              </div>
            </div>

            <div className="border border-slate-200 bg-slate-50/50 p-4 rounded-2xl flex items-center gap-3">
              <span className="p-3 bg-brand-blue/10 text-brand-gold rounded-xl">
                <Info className="w-5 h-5 text-brand-gold" />
              </span>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono block font-bold">{t.atrDossierSize}</span>
                <span className="text-xs font-bold text-slate-900 block">{atrDoc.pages} {t.atrPagesLabel}</span>
              </div>
            </div>
          </div>

          {/* Tables side-by-side matrices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Table 1 Card */}
            <div className="border border-slate-200 bg-slate-50/30 rounded-2xl p-4 md:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase font-mono text-brand-gold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" /> {t.atrTable1Title}
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">BESS 150MW / 309.6MWh</span>
              </div>

              {filteredTable1.length > 0 ? (
                <div className="space-y-2 font-mono text-xs">
                  {filteredTable1.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start py-2 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg transition-colors gap-4">
                      <span className="text-slate-600 font-semibold text-left leading-tight">{translateKey(item.key, lang)}</span>
                      <span className="text-slate-900 font-bold text-right shrink-0">{translateValue(item.value, lang)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500 font-mono">{t.atrNoMatches}</div>
              )}
            </div>

            {/* Table 2 Card */}
            <div className="border border-slate-200 bg-slate-50/30 rounded-2xl p-4 md:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase font-mono text-brand-gold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" /> {t.atrTable2Title}
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 font-bold font-bold">900 x EH Inverters</span>
              </div>

              {filteredTable2.length > 0 ? (
                <div className="space-y-2 font-mono text-xs">
                  {filteredTable2.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start py-2 border-b border-slate-100 hover:bg-slate-50 px-2 rounded-lg transition-colors gap-4">
                      <span className="text-slate-600 font-semibold text-left leading-tight">{translateKey(item.key, lang)}</span>
                      <span className="text-slate-900 font-bold text-right shrink-0">{translateValue(item.value, lang)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-500 font-mono">{t.atrNoMatches}</div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl mt-6 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-605 shrink-0 mt-0.5" />
        <p className="text-slate-700 text-xs md:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t.atrLegalGuarantee }} />
      </div>
    </div>
  );
}
