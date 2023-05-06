import type { PostponeFormValues } from "@/components/PostponeModal";
import { PostponeModal } from "@/components/PostponeModal";
import { useApplyPostponeOrder } from "@/hooks/api/useApplyPostponeOrder";
import { useRouter } from "next/router";
import type { FC } from "react";
import type { ActionWithModalAndConfirmationProps } from "./ActionWithModalAndConfirmation";
import { ActionWithModalAndConfirmation } from "./ActionWithModalAndConfirmation";

export const ApplyPostponeAction: FC<
  Pick<ActionWithModalAndConfirmationProps<PostponeFormValues>, "disabled">
> = ({ disabled }) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: applyPostpone } = useApplyPostponeOrder();

  const handleSubmit = (data: PostponeFormValues) => {
    applyPostpone({
      orderId,
      data: { postponeReason: data.reason, note: data.detail },
    });
  };

  return (
    <ActionWithModalAndConfirmation
      variant="outlined"
      color="error"
      disabled={disabled}
      confirmOptions={{ title: "確定申請延期？" }}
      onClick={handleSubmit}
      Modal={PostponeModal}
    >
      申請延期
    </ActionWithModalAndConfirmation>
  );
};
