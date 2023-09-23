import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Notification } from "@/types/notification";

interface MarkNotificationAsReadParams {
  notificationId: Notification["notificationId"];
}

const markNotificationAsRead = async (params: MarkNotificationAsReadParams) => {
  const { notificationId } = params;
  await axios.patch(`/notifications/${notificationId}/read`);
};

export const useMarkNotificationAsRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => qc.invalidateQueries(["notifications"]),
  });
};
