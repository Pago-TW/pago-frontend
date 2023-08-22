import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zonedTimeToUtc } from "date-fns-tz";

import { axios } from "@/libs/axios";
import type { Trip } from "@/types/trip";

interface AddRoundTripData {
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  arrivalDate: Date;
  returnDate: Date;
}

const addRoundTrip = async (data: AddRoundTripData) => {
  const outboundData = {
    fromCountry: data.fromCountry,
    fromCity: data.fromCity,
    toCountry: data.toCountry,
    toCity: data.toCity,
    arrivalDate: zonedTimeToUtc(data.arrivalDate, "UTC"),
  };
  const outboundRes = await axios.post<Trip>("/trips", outboundData);

  const inboundData = {
    fromCountry: data.toCountry,
    fromCity: data.toCity,
    toCountry: data.fromCountry,
    toCity: data.fromCity,
    arrivalDate: zonedTimeToUtc(data.returnDate, "UTC"),
  };
  const inboundRes = await axios.post<Trip>("/trips", inboundData);

  return {
    outbound: outboundRes.data,
    inbound: inboundRes.data,
  };
};

export const useAddRoundTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addRoundTrip,
    onSuccess: () => qc.invalidateQueries(["trips"]),
  });
};
