import dayjs, { type ConfigType } from "@/libs/dayjs";

import "dayjs/locale/zh-tw";

const DATE_FORMAT = "YYYY-MM-DD" as const;
const TIME_FORMAT = "HH:mm" as const;
const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}` as const;

dayjs.locale("zh-tw");

const now = () => dayjs();

const utcNow = () => now().utc();

const parse = (date: ConfigType) => dayjs(date);

const parseAsDate = (date: ConfigType) => parse(date).toDate();

const format = (date: ConfigType, fmt: string) => parse(date).format(fmt);

const formatDate = (date: ConfigType) => format(date, DATE_FORMAT);

const formatTime = (date: ConfigType) => format(date, TIME_FORMAT);

const formatDateTime = (date: ConfigType) => format(date, DATE_TIME_FORMAT);

const fromNow = (base: ConfigType) => dayjs(base).fromNow();

export {
  now,
  utcNow,
  parse,
  parseAsDate,
  format,
  formatDate,
  formatTime,
  formatDateTime,
  fromNow,
};
