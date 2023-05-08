import { useEffect, useState } from "react";

declare global {
  interface Navigator {
    userLanguage?: string;
  }
}

const getLocale = () => {
  let locale =
    (typeof navigator !== "undefined" &&
      (navigator.language || navigator.userLanguage)) ||
    "en-US";

  try {
    Intl.DateTimeFormat.supportedLocalesOf([locale]);
  } catch (_err) {
    locale = "en-US";
  }

  return locale;
};

export const useLocale = () => {
  const [locale, setLocale] = useState("en-US");

  useEffect(() => {
    setLocale(getLocale());
  }, []);

  return locale;
};
