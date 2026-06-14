/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'tr' | 'en' | 'ro' | 'ru';

export interface TranslationSet {
  title: string;
  subtitle: string;
  heroBadge: string;
  heroTagline: string;
  heroDescription: string;
  primaryAction: string;
  secondaryAction: string;
  
  // Sections navigation
  navOverview: string;
  navDeck: string;
  navSpecs: string;
  navCalculator: string;
  navTimeline: string;
  navContact: string;

  // Deck slide titles and content keys
  slideOf: string;
  fieldSegment1: string;
  fieldSegment2: string;
  totalModules: string;
  capacityWp: string;
  layoutCapacity: string;
  updatedConnectionCost: string;

  // Connection Costs slide
  financialTitle: string;
  itemColumn: string;
  costColumn: string;
  approxValue: string;
  pcs: string;
  each: string;
  connectionNote: string;

  // Permitting Stage slide
  permittingTitle: string;
  studiesTitle: string;
  stageStatusObtained: string;
  stageStatusInProgress: string;
  stageStatusDone: string;
  stageStatusOngoing: string;
  stageSource: string;

  // Video Section
  droneVideoTitle: string;
  droneVideoSubtitle: string;
  droneViewTab: string;
  lidarTab: string;
  reflectivityTab: string;
  overlayDJ205C: string;
  overlayZoning: string;
  overlayGridConnect: string;
  reconstructionLoading: string;

  // Calculator
  calcTitle: string;
  calcDisclaimer: string;
  calcBessPower: string;
  calcBessEnergy: string;
  calcArbitrageSpread: string;
  calcCycleFrequency: string;
  calcEsmRevenue: string;
  calcPaybackPeriod: string;
  calcAnnualRevenue: string;
  calcYears: string;
  calcCapEx: string;
  calcYearlyOpEx: string;

  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactHeaderForm: string;
  contactFormName: string;
  contactFormCompany: string;
  contactFormEmail: string;
  contactFormPhone: string;
  contactFormRole: string;
  contactFormType: string;
  contactFormTypeAcquisition: string;
  contactFormTypeJV: string;
  contactFormTypeBroker: string;
  contactFormMessage: string;
  contactFormNDA: string;
  contactFormNDAYes: string;
  contactFormSubmit: string;
  contactFormSuccess: string;
  contactInfoTitle: string;
  contactPhoneLabel: string;
  contactEmailLabel: string;
  contactUrlLabel: string;
  contactTelegramLabel: string;
  contactCredibilityText: string;
}

export interface DeckSlide {
  id: number;
  image: string;
  tr: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    bullets?: string[];
  };
  en: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    bullets?: string[];
  };
  ro: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    bullets?: string[];
  };
  ru: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    bullets?: string[];
  };
}

export interface TimelineMilestone {
  phase: string;
  dates: string;
  tr: { title: string; desc: string; };
  en: { title: string; desc: string; };
  ro: { title: string; desc: string; };
  ru: { title: string; desc: string; };
  highlight?: boolean;
}

export interface AtrDocument {
  id: string; // 'carligele1' | 'carligele2'
  title: string;
  regDate: string;
  applicant: string;
  piPower: string;
  storedEnergy: string;
  tables: {
    table1: Array<{ key: string; value: string }>;
    table2: Array<{ key: string; value: string }>;
  };
  pages: number;
}
