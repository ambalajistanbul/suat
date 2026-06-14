/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Percent, TrendingUp, DollarSign, Calculator, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface InvestmentCalculatorProps {
  lang: Language;
}

export default function InvestmentCalculator({ lang }: InvestmentCalculatorProps) {
  const [bessPower, setBessPower] = useState<number>(300); // Default 300 MW (2 x 150 MW)
  const [bessDuration, setBessDuration] = useState<number>(2); // Default 2 Hours (300MW/600MWh)
  const [arbitrageSpread, setArbitrageSpread] = useState<number>(65); // €/MWh Average peak-valley spread
  const [dailyCycles, setDailyCycles] = useState<number>(1.2); // Core Cycles
  const [ancillarySvcRate, setAncillarySvcRate] = useState<number>(12000); // €/MW per year system services
  
  const t = TRANSLATIONS[lang];

  // Calculations
  const bessCapacityMWh = bessPower * bessDuration;
  
  // CAPEX calculations based on EU market rates (€320K/MWh for fully installed tier-1 LFP BESS + €21M Connection cost)
  const estimatedCapEx = (bessCapacityMWh * 310000) + 21000000;
  
  // OpEx approx 1.5% of CapEx annually
  const estimatedOpEx = estimatedCapEx * 0.015;

  // Arbitrage revenue
  const annualArbitrageRevenue = bessCapacityMWh * arbitrageSpread * dailyCycles * 365;

  // Ancillary services (FCR/aFRR system balancing)
  const annualAncillaryRevenue = bessPower * ancillarySvcRate;

  // Totals
  const totalAnnualGrossRevenue = annualArbitrageRevenue + annualAncillaryRevenue;
  const netAnnualRevenues = totalAnnualGrossRevenue - estimatedOpEx;
  const paybackYears = Number((estimatedCapEx / netAnnualRevenues).toFixed(1));

  return (
    <div className="glass rounded-3xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-900 to-indigo-800 text-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="p-3 bg-white/10 text-white rounded-2xl border border-white/10">
            <Calculator className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-sans">{t.calcTitle}</h3>
            <p className="text-indigo-100 text-xs md:text-sm mt-0.5">{t.calcDisclaimer}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Sliders Area */}
        <div className="p-6 md:p-8 lg:col-span-7 space-y-6 bg-white">
          {/* Bess Power Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-bold text-slate-700 flex items-center gap-1">
                {t.calcBessPower}
                <HelpCircle className="w-3.5 h-3.5 text-slate-450 cursor-help" title="Combined power capacity of Cârligele 1 & 2" />
              </span>
              <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">{bessPower} MW</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={bessPower}
              onChange={(e) => setBessPower(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
            />
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-bold text-slate-700 flex items-center gap-1">
                {t.calcBessEnergy} (Hours)
                <HelpCircle className="w-3.5 h-3.5 text-slate-450 cursor-help" title="Discharge rate hours defining total MWh capacity" />
              </span>
              <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">{bessDuration} {t.calcYears} / {bessCapacityMWh} MWh</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={bessDuration}
              onChange={(e) => setBessDuration(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
            />
          </div>

          {/* Arbitrage Spread Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-bold text-slate-700 flex items-center gap-1">
                {t.calcArbitrageSpread}
                <HelpCircle className="w-3.5 h-3.5 text-slate-450 cursor-help" title="Difference between charging rate (valley) and discharge rate (peak) spot prices" />
              </span>
              <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">€{arbitrageSpread} / MWh</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={arbitrageSpread}
              onChange={(e) => setArbitrageSpread(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
            />
          </div>

          {/* Daily Cycles Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-bold text-slate-700 flex items-center gap-1">
                {t.calcCycleFrequency}
                <HelpCircle className="w-3.5 h-3.5 text-slate-450 cursor-help" title="Average full charging and discharging rounds daily" />
              </span>
              <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                {dailyCycles} {lang === 'tr' ? 'Çevrim' : lang === 'ro' ? 'Cicluri' : lang === 'ru' ? 'Циклов' : 'Cycles'}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={dailyCycles}
              onChange={(e) => setDailyCycles(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
            />
          </div>

          {/* Grid Services Bonus Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-bold text-slate-700 flex items-center gap-1">
                {t.calcAncillaryHeading}
                <HelpCircle className="w-3.5 h-3.5 text-slate-450 cursor-help" title="FCR and aFRR standby premium standby tariff paid by the Operator annually" />
              </span>
              <span className="text-sm font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                €{ancillarySvcRate.toLocaleString()} {t.calcAncillarySvcUnit}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="25000"
              step="1000"
              value={ancillarySvcRate}
              onChange={(e) => setAncillarySvcRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-blue"
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="p-6 md:p-8 lg:col-span-12 xl:col-span-5 bg-slate-50/50 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* CAPEX estimation */}
            <div className="border border-slate-200 bg-white p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">{t.calcCapEx}</span>
              <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1 mt-1">
                €{(estimatedCapEx / 1000000).toFixed(1)}M
                <span className="text-xs text-slate-500 font-mono font-medium">{t.calcApproxHeading}</span>
              </div>
            </div>

            {/* OpEx Estimation */}
            <div className="border border-slate-200 bg-white p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">{t.calcYearlyOpEx}</span>
              <div className="text-lg font-bold text-slate-850 mt-1">
                €{Math.round(estimatedOpEx).toLocaleString()} <span className="text-xs text-slate-500 font-mono font-normal">{t.calcPerYearUnit}</span>
              </div>
            </div>

            {/* Calculated Gross Revenue */}
            <div className="border border-slate-200 bg-white p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">{t.calcAnnualRevenue}</span>
              <div className="text-3xl font-black text-emerald-600 flex items-baseline gap-1 mt-1">
                €{(totalAnnualGrossRevenue / 1000000).toFixed(2)}M
                <span className="text-xs text-slate-500 font-mono font-medium">{t.calcPerYearUnit}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500 font-mono">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {t.calcArbitSistemSummary
                    .replace('$$ARB$$', (annualArbitrageRevenue / 1000000).toFixed(1))
                    .replace('$$SYS$$', (annualAncillaryRevenue / 1000000).toFixed(1))}
                </span>
              </div>
            </div>
          </div>

          {/* Payback period call to action */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-750 text-center relative overflow-hidden shadow-lg">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <DollarSign className="w-36 h-36 text-amber-500 -mb-4 -mr-4" />
            </div>
            <div className="relative z-10">
              <span className="text-xs text-amber-400 font-mono uppercase tracking-wider font-bold block mb-1">{t.calcPaybackPeriod}</span>
              <div className="text-4xl font-extrabold text-white">{paybackYears} {lang === 'tr' ? 'Yıl' : lang === 'ro' ? 'Ani' : lang === 'ru' ? 'Лет' : 'Years'}</div>
              <p className="text-[10px] text-slate-300 mt-2 leading-relaxed font-medium">
                {t.calcPaybackDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
