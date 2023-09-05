import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type {
  NewTripCollectionFormValues} from "@/schemas/new-trip-collection";
import {
  newTripCollectionDataSchema
} from "@/schemas/new-trip-collection";
import type { TripCollection } from "@/types/trip";

type Response = Pick<
  TripCollection,
  "tripCollectionId" | "tripCollectionName"
> & { creatorId: string; createDate: string; updateDate: string };

const addTripCollection = async (data: NewTripCollectionFormValues) => {
  const res = await axios.post<Response>(
    "/trips/batch",
    newTripCollectionDataSchema.parse(data)
  );
  return res.data;
};

export const useAddTripCollection = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addTripCollection,
    onSuccess: () => qc.invalidateQueries(["trips", "collections"]),
  });
};
