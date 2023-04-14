import type { Trip } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTrips = async (): Promise<Trip[]> => {
  const res = await axios.get("/trips");
  return res.data.data;
};

export const useTrips = () => {
  return useQuery({ queryKey: ["trips"], queryFn: getTrips });
};

export default useTrips;
