/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Send, Award, Phone, Send as Telegram, Download, CheckCircle, FileText } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface InquiryFormProps {
  lang: Language;
}

export default function InquiryForm({ lang }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    role: '',
    inquiryType: 'acquisition',
    message: '',
    requestNda: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request to backend or proxy
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleDownloadStubNda = () => {
    // Generate a sleek clean text file resembling an NDA agreement outline
    const ndaText = `UNIVERSE GREETINGS - NON-DISCLOSURE AGREEMENT (OUTLINE)
PROJECT: Cârligele BESS Portfolio (Romania - 300 MW / 300 MWh + 25 MW Solar)
PARTIES: Hellios Brenpro SRL & Electricspark SRL and the receiving Recipient.

1. Purpose: The parties wish to evaluate a potential transaction concerning the share acquisition or joint venture of the Cârligele BESS project.
2. Confidential Information: Includes all technical layouts, Transelectrica CTS files, land surface leases, and financial models.
3. Demarcation: Grounded on Romanian Law, subject to Bucharest court jurisdiction.

For complete execution and digital sign, please complete the inquiry webform.
ISSUED: June 2026`;
    
    const blob = new Blob([ndaText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cârligele_BESS_NDA_Template.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Forms column */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h4 className="text-lg font-bold font-sans text-slate-900">{t.contactHeaderForm}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormName}</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormCompany}</label>
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all"
                  placeholder="e.g. Clean Energy Fund"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormEmail}</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all"
                  placeholder="institutional@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormPhone}</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all"
                  placeholder="+40 700 000 000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormRole}</label>
                <input 
                  type="text" 
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all"
                  placeholder="e.g. VP Infrastructure M&A"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormType}</label>
                <select 
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                  className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all cursor-pointer"
                >
                  <option value="acquisition" className="bg-white text-slate-900 font-semibold">{t.contactFormTypeAcquisition}</option>
                  <option value="joint_venture" className="bg-white text-slate-900 font-semibold">{t.contactFormTypeJV}</option>
                  <option value="broker" className="bg-white text-slate-900 font-semibold">{t.contactFormTypeBroker}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.contactFormMessage}</label>
              <textarea 
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="input-field w-full rounded-xl px-4 py-2.5 text-slate-800 font-bold bg-slate-50 outline-none transition-all resize-none"
                placeholder={lang === 'tr' ? 'Lütfen kurumsal parametrelerinizi, bütçe aralığınızı ve satın alma takviminizi kısaca özetleyin...' : lang === 'ro' ? 'Vă rugăm să rezumați pe scurt parametrii instituționali, intervalul de buget și calendarul tranzacției...' : lang === 'ru' ? 'Пожалуйста, кратко опишите параметры вашей организации, бюджетный диапазон и график планируемой сделки...' : 'Briefly summarize your institutional parameters, purchase budget range, and timeline guidelines...'}
              />
            </div>

            {/* NDA request checkbox */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.requestNda}
                  onChange={(e) => setFormData({...formData, requestNda: e.target.checked})}
                  className="mt-1 w-4.5 h-4.5 accent-brand-gold cursor-pointer"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 block">{t.contactFormNDA}</span>
                  <span className="text-[11px] text-slate-700 leading-normal block mt-1 font-semibold">{t.contactFormNDAYes}</span>
                </div>
              </label>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-white font-black py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? t.transmittingRFP : t.contactFormSubmit}
            </motion.button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-4 h-full flex flex-col items-center justify-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-slate-900 font-sans">{t.rfpGigaTransmitted}</h4>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed font-bold">
              {t.contactFormSuccess}
            </p>
            {formData.requestNda && (
              <button 
                onClick={handleDownloadStubNda}
                className="mt-2 text-xs font-mono font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 border border-amber-200 px-4 py-2 rounded-xl bg-amber-50"
              >
                <FileText className="w-4 h-4 text-amber-600" /> {t.downloadNdaPreviewLabel}
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Info Contact Credentials Side Card */}
      <div className="lg:col-span-5 bg-slate-900 border border-slate-950 p-6 md:p-8 rounded-3xl text-slate-200 flex flex-col justify-between space-y-8 shadow-xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-wider text-brand-gold uppercase bg-brand-gold/10 px-2.5 py-1 rounded-md border border-brand-gold/20">
              {t.secureDepositoryOffice}
            </span>
            <h4 className="text-xl md:text-2xl font-bold font-sans text-white">{t.contactInfoTitle}</h4>
          </div>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-semibold">
            {t.contactCredibilityText}
          </p>

          <div className="h-px bg-slate-800" />

          {/* Contact Methods */}
          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-brand-gold">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">{t.contactEmailLabel}</span>
                <a href="mailto:suat@duck.com" className="text-slate-100 hover:text-brand-gold font-bold text-sm block">suat@duck.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400">
                <Telegram className="w-4.5 h-4.5" />
              </span>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-bold">{t.contactTelegramLabel}</span>
                <a href="https://t.me/akilion" target="_blank" rel="noreferrer" className="text-slate-100 hover:text-indigo-400 font-bold text-sm block">@akilion</a>
              </div>
            </div>
          </div>
        </div>

        {/* NDA Quick download templates banner */}
        <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="block text-xs font-bold text-white">{t.standardNdaDraftLabel}</span>
            <span className="block text-[10px] text-slate-500 font-medium">{t.fastTrackEvaluationsLabel}</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadStubNda}
            className="w-10 h-10 rounded-xl bg-brand-gold text-slate-950 flex items-center justify-center cursor-pointer shadow-md hover:bg-brand-gold/90"
            title="Download NDA Draft"
          >
            <Download className="w-4.5 h-4.5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
