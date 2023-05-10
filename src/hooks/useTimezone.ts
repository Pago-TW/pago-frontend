import { useEffect, useState } from "react";

export const useTimezone = () => {
  const [timezone, setTimezone] = useState("en-US");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return timezone;
};
