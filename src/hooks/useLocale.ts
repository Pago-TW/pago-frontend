export const useLocale = () => {
  const locale = navigator.language || "zh-TW";
  return locale;
};
