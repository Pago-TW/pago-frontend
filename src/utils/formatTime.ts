import { intlFormat, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const formatTime = ({
  date,
  timezone,
  locale,
}: {
  date: string;
  timezone: string;
  locale: string;
}) =>
  intlFormat(
    utcToZonedTime(parseISO(date), timezone),
    { hour: "2-digit", minute: "2-digit" },
    { locale }
  );
