
import { Collection } from './types';

export const COLLECTIONS: Collection[] = [
  {
    id: 'letter-dark',
    name: 'Letter (Dark)',
    slug: 'letter-dark',
    description: 'A minimalist dark scriptorium. White ink on a midnight void.',
    language: 'Universal',
    poemCount: 0,
    background: '#000000',
    text: '#FFFFFF',
    primary: '#FFFFFF',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'write-up',
    name: 'Writeup',
    slug: 'write-up',
    description: 'The standard of clarity. Black ink on a pure white field.',
    language: 'Universal',
    poemCount: 0,
    background: '#FFFFFF',
    text: '#000000',
    primary: '#000000',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'old-english',
    name: 'Old English',
    slug: 'old-english',
    description: 'Early compositions exploring form and structure.',
    language: 'English',
    poemCount: 143,
    background: '#FFF1F2',
    text: '#881337',
    primary: '#E11D48',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'old-urdu',
    name: 'Old Urdu',
    slug: 'old-urdu',
    description: 'The beginnings of expression in the mother tongue.',
    language: 'Urdu',
    poemCount: 36,
    background: '#FDF2F8',
    text: '#831843',
    primary: '#DB2777',
    fontClass: 'font-urdu'
  },
  {
    id: 'greek',
    name: 'Greek',
    slug: 'greek',
    description: 'Philosophical explorations inspired by Hellenistic thought and myth.',
    language: 'English',
    poemCount: 13,
    background: '#F0F9FF',
    text: '#1A365D',
    primary: '#3182CE',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'latin',
    name: 'Latin',
    slug: 'latin',
    description: 'Classical themes of Roman virtue, stoicism, and time.',
    language: 'English',
    poemCount: 22,
    background: '#FFFBEB',
    text: '#744210',
    primary: '#D69E2E',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'general-english',
    name: 'General English',
    slug: 'general-english',
    description: 'A collection of general English poems and songs.',
    language: 'English',
    poemCount: 33,
    background: '#FAFAFA',
    text: '#52525B',
    primary: '#52525B',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'general-urdu',
    name: 'General Urdu',
    slug: 'general-urdu',
    description: 'A collection of general Urdu poems and songs.',
    language: 'Urdu',
    poemCount: 20,
    background: '#F5F5F5',
    text: '#1F2937',
    primary: '#4B5563',
    fontClass: 'font-urdu'
  },
  {
    id: 'theological-era',
    name: 'Theological Era',
    slug: 'theological-era',
    description: 'Poems from the era of theological crisis and exploration.',
    language: 'English',
    poemCount: 115,
    background: '#EEF2FF',
    text: '#312E81',
    primary: '#4F46E5',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'new-english',
    name: 'New English',
    slug: 'new-english',
    description: 'Recent English compositions.',
    language: 'English',
    poemCount: 34,
    background: '#FAF5FF',
    text: '#581C87',
    primary: '#9333EA',
    fontClass: 'font-serif-quote'
  },
  {
    id: 'nazm-e-adil-vol-1',
    name: 'Nazm-e-Adil Vol 1',
    slug: 'nazm-e-adil-vol-1',
    description: 'The first volume of collected Nazms. The Crisis Arc.',
    language: 'Urdu',
    poemCount: 23,
    background: '#FFF7ED',
    text: '#7F1D1D',
    primary: '#EA580C',
    fontClass: 'font-urdu'
  },
  {
    id: 'nazm-e-adil-vol-2',
    name: 'Nazm-e-Adil Vol 2',
    slug: 'nazm-e-adil-vol-2',
    description: 'Journal entries of subsistence and philosophical calm.',
    language: 'Urdu',
    poemCount: 17,
    background: '#ECFDF5',
    text: '#064E3B',
    primary: '#059669',
    fontClass: 'font-urdu'
  },
  {
    id: 'naghma-haye-hoor',
    name: 'Naghma-haye-Hoor',
    slug: 'naghma-haye-hoor',
    description: 'Songs of the Beloved. A dedicated collection for the muse.',
    language: 'Urdu',
    poemCount: 21,
    background: '#FCE7F3',
    text: '#9D174D',
    primary: '#DB2777',
    fontClass: 'font-urdu',
    hidden: true
  },
  {
    id: 'merihond',
    name: 'Merihond',
    slug: 'merihond',
    description: 'Verses from the distant star. A collection discovered beyond the cosmos.',
    language: 'Punjabi',
    poemCount: 13,
    background: '#E0F2FE',
    text: '#075985',
    primary: '#0EA5E9',
    fontClass: 'font-serif-quote',
    hidden: true
  }
];

export const STORAGE_KEY = 'muse_saved_quotes_v3';
