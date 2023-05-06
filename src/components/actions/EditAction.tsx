import { useRouter } from "next/router";
import type { FC } from "react";
import type { ActionWithConfirmationProps } from "./ActionWithConfirmation";
import { ActionWithConfirmation } from "./ActionWithConfirmation";

export const EditAction: FC<Pick<ActionWithConfirmationProps, "disabled">> = ({
  disabled,
}) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const handleConfirm = () => router.replace(`/orders/${orderId}/edit`);
  return (
    <ActionWithConfirmation
      disabled={disabled}
      confirmOptions={{
        title: "編輯委託資訊將會使代購者已出價的紀錄刪除，確定要編輯嗎？",
      }}
      onClick={handleConfirm}
    >
      編輯委託
    </ActionWithConfirmation>
  );
};