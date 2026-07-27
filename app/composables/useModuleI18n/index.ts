import type { I18nModuleType } from './types';

export const useModuleI18n = async (module: I18nModuleType) => {
  const { locale, mergeLocaleMessage } = useI18n();
  try {
    const messages = await import(`~~/i18n/locales/${locale.value}/${module}.json`);
    mergeLocaleMessage(locale.value, messages.default || messages);
  }
  catch {
    console.error(`Failed to load i18n module: ${module} for locale: ${locale.value}`);
  }
};
