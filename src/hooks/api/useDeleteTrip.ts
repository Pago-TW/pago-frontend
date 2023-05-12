import { axios } from "@/libs/axios";
import type { Trip } from "@/types/trip";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteTripParams = {
  tripId: Trip["tripId"];
};

const deleteTrip = async (params: DeleteTripParams) => {
  const { tripId } = params;

  return await axios.delete<void>(`/trips/${tripId}`);
};

export const useDeleteTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => qc.invalidateQueries(["trips"]),
  });
};
