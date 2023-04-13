import type { OneWayTripFormValues } from "@/components/forms/OneWayTripForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addTrip = async (data: OneWayTripFormValues) => {
  const res = await axios.post("/trips", data);
  return res.data;
};

export const useAddTrip = () => {
  return useMutation({ mutationFn: addTrip });
};
