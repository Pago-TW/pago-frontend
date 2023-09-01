import type { FC } from "react";
import { useRouter } from "next/router";

import {
  ActionWithModalAndConfirmation,
  type ActionWithModalAndConfirmationProps,
} from "@/components/actions/action-with-modal-and-confirmation";
import {
  ApplyPostponeModal,
  type ApplyPostponeFormValues,
} from "@/components/actions/apply-postpone-modal";
import { useApplyPostponeOrder } from "@/hooks/api/use-apply-postpone-order";

export const ApplyPostponeAction: FC<
  Pick<ActionWithModalAndConfirmationProps<ApplyPostponeFormValues>, "disabled">
> = ({ disabled }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: applyPostpone } = useApplyPostponeOrder();

  const handleSubmit = (data: ApplyPostponeFormValues) => {
    applyPostpone({
      orderId,
      data: { postponeReason: data.reason, note: data.detail },
    });
  };

  return (
    <ActionWithModalAndConfirmation
      disabled={disabled}
      confirmOptions={{ title: "確定申請延期？" }}
      onClick={handleSubmit}
      Modal={ApplyPostponeModal}
    >
      申請延期
    </ActionWithModalAndConfirmation>
  );
};
