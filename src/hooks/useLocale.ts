import { useEffect, useState } from "react";

declare global {
  interface Navigator {
    userLanguage?: string;
  }
}

const getLocale = () => {
  let locale =
    (typeof navigator !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      (navigator.language || navigator.userLanguage)) ||
    "en-US";

  try {
    Intl.DateTimeFormat.supportedLocalesOf([locale]);
  } catch (_err) {
    locale = "zh-TW";
  }

  return locale;
};

export const useLocale = () => {
  const [locale, setLocale] = useState("zh-TW");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  return locale;
};
