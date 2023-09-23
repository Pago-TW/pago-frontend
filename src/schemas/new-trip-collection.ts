import { z } from "zod";

import { zDayjs, zPlace } from "@/types/zod";
import { generateCollectionName } from "@/utils/trip";

export const newTripCollectionFormSchema = z
  .object({
    tripCollectionName: z.string().trim(),
    departure: zPlace,
    stops: z
      .object({
        place: zPlace,
        arrivalDate: zDayjs,
      })
      .array()
      .min(1),
  })
  .transform(({ tripCollectionName, ...data }) => {
    const firstArrivalDate = data.stops.at(0)?.arrivalDate;
    const lastArrivalDate = data.stops.at(-1)?.arrivalDate;

    return {
      tripCollectionName: tripCollectionName
        ? tripCollectionName
        : generateCollectionName(firstArrivalDate, lastArrivalDate),
      ...data,
    };
  });
export type NewTripCollectionFormValues = z.infer<
  typeof newTripCollectionFormSchema
>;

export const newTripCollectionDataSchema =
  newTripCollectionFormSchema.transform(({ departure, stops, ...data }) => {
    const transformedDeparture = {
      country: departure.countryCode,
      city: departure.cityCode,
    };

    const transformedStops = stops.map(({ place, arrivalDate }) => ({
      country: place.countryCode,
      city: place.cityCode,
      arrivalDate: arrivalDate.toDate(),
    }));

    return {
      ...data,
      departure: transformedDeparture,
      stops: transformedStops,
    };
  });
export type NewTripCollectionDataValues = z.infer<
  typeof newTripCollectionDataSchema
>;
