import type { Trip } from "@/types/trip";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation({ mutationFn: addTrip });
};
