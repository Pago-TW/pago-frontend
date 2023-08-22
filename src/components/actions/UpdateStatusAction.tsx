import type { FC } from "react";
import { useRouter } from "next/router";

import {
  ActionWithConfirmation,
  type ActionWithConfirmationProps,
} from "@/components/ActionWithConfirmation";
import { useUpdateOrder } from "@/hooks/api/useUpdateOrder";
import type { OrderStatus } from "@/types/order";

export const UpdateStatusAction: FC<
  Pick<
    ActionWithConfirmationProps,
    "confirmOptions" | "disabled" | "children"
  > & {
    newStatus: OrderStatus;
  }
> = ({ confirmOptions, disabled, newStatus, children }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: updateOrder } = useUpdateOrder();

  const handleConfirm = () => {
    updateOrder({
      orderId,
      data: {
        orderStatus: newStatus,
      },
    });
  };

  return (
    <ActionWithConfirmation
      disabled={disabled}
      confirmOptions={confirmOptions}
      onClick={handleConfirm}
    >
      {children}
    </ActionWithConfirmation>
  );
};
