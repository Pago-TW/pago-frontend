import dayjs, { type ConfigType } from "@/libs/dayjs";

import "dayjs/locale/zh-tw";

const DATE_FORMAT = "YYYY-MM-DD" as const;
const TIME_FORMAT = "HH:mm:ss" as const;
const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}` as const;

dayjs.locale("zh-tw");

const now = () => dayjs();

const utcNow = () => now().utc();

const parse = (date: ConfigType) => dayjs(date);

const parseAsDate = (date: ConfigType) => parse(date).toDate();

const formatDate = (date: ConfigType) => parse(date).format(DATE_FORMAT);

const formatTime = (date: ConfigType) => parse(date).format(TIME_FORMAT);

const formatDateTime = (date: ConfigType) =>
  parse(date).format(DATE_TIME_FORMAT);

const fromNow = (base: ConfigType) => dayjs(base).fromNow();

export {
  now,
  utcNow,
  parse,
  parseAsDate,
  formatDate,
  formatTime,
  formatDateTime,
  fromNow,
};
