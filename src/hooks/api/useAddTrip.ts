import type { Trip } from "@/types/trip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AddTripData = {
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  arrivalDate: Date;
};

const addTrip = async (data: AddTripData) => {
  const res = await axios.post<Trip>("/trips", data);
  return res.data;
};

export const useAddTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addTrip,
    onSuccess: () => qc.invalidateQueries(["trips"]),
  });
};
