import type { CancelFormValues } from "@/components/CancelModal";
import { CancelModal } from "@/components/CancelModal";
import { useApplyCancelOrder } from "@/hooks/api/useApplyCancelOrder";
import type { Perspective } from "@/types/misc";
import { useRouter } from "next/router";
import type { FC } from "react";
import type { ActionWithModalAndConfirmationProps } from "./ActionWithModalAndConfirmation";
import { ActionWithModalAndConfirmation } from "./ActionWithModalAndConfirmation";

export const ApplyCancelAction: FC<
  Pick<ActionWithModalAndConfirmationProps<CancelFormValues>, "disabled"> & {
    perspective: Perspective;
  }
> = ({ disabled, perspective }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: applyCancel } = useApplyCancelOrder();

  const handleSubmit = (data: CancelFormValues) =>
    applyCancel({
      orderId,
      data: { cancelReason: data.reason, note: data.detail },
    });

  return (
    <ActionWithModalAndConfirmation
      variant="outlined"
      color="error"
      disabled={disabled}
      confirmOptions={{ title: "確定取消此代購？" }}
      onClick={handleSubmit}
      Modal={CancelModal}
    >
      {perspective === "consumer" ? "取消委託" : "取消代購"}
    </ActionWithModalAndConfirmation>
  );
};
