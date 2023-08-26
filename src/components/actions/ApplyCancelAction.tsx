import type { FC } from "react";
import { useRouter } from "next/router";

import {
  ActionWithModalAndConfirmation,
  type ActionWithModalAndConfirmationProps,
} from "@/components/actions/ActionWithModalAndConfirmation";
import {
  ApplyCancelModal,
  type ApplyCancelFormValues,
} from "@/components/actions/ApplyCancelModal";
import { useApplyCancelOrder } from "@/hooks/api/useApplyCancelOrder";
import type { Perspective } from "@/types/misc";

export const ApplyCancelAction: FC<
  Pick<
    ActionWithModalAndConfirmationProps<ApplyCancelFormValues>,
    "disabled"
  > & {
    perspective: Perspective;
  }
> = ({ disabled, perspective }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: applyCancel } = useApplyCancelOrder();

  const handleSubmit = (data: ApplyCancelFormValues) =>
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
      Modal={ApplyCancelModal}
    >
      {perspective === "consumer" ? "取消委託" : "取消代購"}
    </ActionWithModalAndConfirmation>
  );
};
