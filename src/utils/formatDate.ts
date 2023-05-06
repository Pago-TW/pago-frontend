import { intlFormat, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const formatDate = ({
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
    { year: "numeric", month: "2-digit", day: "2-digit" },
    { locale }
  );
