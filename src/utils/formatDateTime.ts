import { intlFormat, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

interface IntlFormatOptions {
  localeMatcher?: "lookup" | "best fit";
  weekday?: "narrow" | "short" | "long";
  era?: "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
  formatMatcher?: "basic" | "best fit";
  hour12?: boolean;
  timeZone?: string;
}

interface IntlLocaleOptions {
  locale?: string | string[];
}

type FormatDateTimeParams = Omit<IntlFormatOptions, "timeZone"> &
  IntlLocaleOptions & {
    date: string | Date;
    timezone?: string;
  };

export const parseDate = ({
  date,
  timezone,
}: Pick<FormatDateTimeParams, "date" | "timezone">) =>
  (timezone && utcToZonedTime(date, timezone)) ||
  (date instanceof Date && date) ||
  parseISO(date);

export const formatDateTime = ({
  date,
  timezone,
  locale,
  ...formatOptions
}: FormatDateTimeParams) => {
  return intlFormat(
    parseDate({ date, timezone }),
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      ...formatOptions,
    },
    { locale }
  );
};

export const formatDate = ({
  date,
  timezone,
  locale,
  ...formatOptions
}: Omit<FormatDateTimeParams, "hour" | "minute" | "second">) => {
  return intlFormat(
    parseDate({ date, timezone }),
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...formatOptions,
    },
    { locale }
  );
};

export const formatTime = ({
  date,
  timezone,
  locale,
  ...formatOptions
}: Omit<
  FormatDateTimeParams,
  "weekday" | "era" | "year" | "month" | "day"
>) => {
  return intlFormat(
    parseDate({ date, timezone }),
    {
      hour: "2-digit",
      minute: "2-digit",
      ...formatOptions,
    },
    { locale }
  );
};
