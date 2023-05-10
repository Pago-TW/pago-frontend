import { useEffect, useState } from "react";

export const useTimezone = () => {
  const [timezone, setTimezone] = useState("Asia/Taipei");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return timezone;
};
