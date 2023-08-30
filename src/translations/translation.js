import en from './en.json';
import ar from './ar.json';

// Bonus: making the website bilingual

const translations = {
  en,
  ar,
};

export function translate(key, language = 'en') {
  const translation = translations[language][key] || key;
  return translation;
}