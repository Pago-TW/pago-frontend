import { useEffect, useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLanguage(navigator.language);
    setIsLoading(false);
  }, []);

  return isLoading ? undefined : language;
};
