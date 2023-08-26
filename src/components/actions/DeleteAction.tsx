import type { FC } from "react";
import { useRouter } from "next/router";

import {
  ActionWithConfirmation,
  type ActionWithConfirmationProps,
} from "@/components/actions/ActionWithConfirmation";
import { useDeleteOrder } from "@/hooks/api/useDeleteOrder";

export const DeleteAction: FC<
  Pick<ActionWithConfirmationProps, "disabled">
> = ({ disabled }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: deleteOrder } = useDeleteOrder();

  const handleConfirm = () => {
    deleteOrder({ orderId });
    router.replace("/orders");
  };

  return (
    <ActionWithConfirmation
      disabled={disabled}
      variant="outlined"
      color="error"
      confirmOptions={{ title: "確定刪除委託？" }}
      onClick={handleConfirm}
    >
      刪除委託
    </ActionWithConfirmation>
  );
};
