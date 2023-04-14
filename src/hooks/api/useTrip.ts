import type { Trip } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTrip = async (tripId: Trip["tripId"]): Promise<Trip> => {
  const res = await axios.get(`/trips/${tripId}`);
  return res.data;
};

export const useTrip = (tripId: Trip["tripId"]) => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTrip(tripId),
  });
};

export default useTrip;
