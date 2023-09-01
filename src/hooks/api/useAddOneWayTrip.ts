import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Trip } from "@/types/trip";

interface AddOneWayTripData {
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  arrivalDate: Date;
}

const addOneWayTrip = async (data: AddOneWayTripData) => {
  const res = await axios.post<Trip>("/trips", data);
  return res.data;
};

export const useAddOneWayTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addOneWayTrip,
    onSuccess: () => qc.invalidateQueries(["trips"]),
  });
};
