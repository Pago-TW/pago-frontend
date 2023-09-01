import { z } from "zod";

import dayjs, { type Dayjs } from "@/libs/dayjs";

const zDayjs = z.custom<Dayjs>((data) => dayjs.isDayjs(data));

export { zDayjs };
