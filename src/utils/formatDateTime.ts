import { intlFormat, parseISO } from "date-fns";

type IntlFormatOptions = {
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
};

type IntlLocaleOptions = {
  locale?: string | string[];
};

type FormatDateTimeParams = Omit<IntlFormatOptions, "timeZone"> &
  IntlLocaleOptions & {
    date: string | Date;
    timezone?: string;
  };

export const formatDateTime = ({
  date,
  timezone,
  locale,
  ...formatOptions
}: FormatDateTimeParams) => {
  const parsedDate = date instanceof Date ? date : parseISO(date);

  return intlFormat(
    parsedDate,
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
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
  const parsedDate = date instanceof Date ? date : parseISO(date);

  return intlFormat(
    parsedDate,
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone,
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
  const parsedDate = date instanceof Date ? date : parseISO(date);

  return intlFormat(
    parsedDate,
    {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
      ...formatOptions,
    },
    { locale }
  );
};
