import { z } from "zod";

import dayjs, { type Dayjs } from "@/libs/dayjs";

export const zDayjs = z.custom<Dayjs>((data) => dayjs.isDayjs(data));

export const zPlace = z.object({
  countryCode: z.string().min(2),
  cityCode: z.string().min(3),
});
