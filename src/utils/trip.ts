import type { ConfigType } from "@/libs/dayjs";
import { formatDate } from "@/utils/date";

export const generateCollectionName = (
  firstArrivalDate: ConfigType,
  lastArrivalDate: ConfigType
) => {
  const firstArrivalDateString = formatDate(firstArrivalDate);
  const lastArrivalDateString = formatDate(lastArrivalDate);
  return `${firstArrivalDateString}~${lastArrivalDateString}的旅途`;
};
