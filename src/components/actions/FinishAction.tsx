import type { FC } from "react";
import { useRouter } from "next/router";

import type { ConfirmOptions } from "material-ui-confirm";

import {
  ActionWithConfirmation,
  type ActionWithConfirmationProps,
} from "@/components/actions/ActionWithConfirmation";
import {
  AddReviewModal,
  type AddReviewFormValues,
  type AddReviewModalProps,
} from "@/components/actions/AddReviewModal";
import { useAddReview } from "@/hooks/api/useAddReview";
import { useUpdateOrder } from "@/hooks/api/useUpdateOrder";
import { useOpen } from "@/hooks/useOpen";
import type { Perspective } from "@/types/misc";

export type FinishActionProps = Pick<
  ActionWithConfirmationProps,
  "disabled" | "children"
> & {
  perspective: Perspective;
  confirmOptions: ConfirmOptions;
  reviewTargetId: AddReviewModalProps["targetId"];
};

export const FinishAction: FC<FinishActionProps> = ({
  perspective,
  confirmOptions,
  disabled,
  reviewTargetId,
  children,
}) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { open, handleOpen, handleClose } = useOpen();

  const { mutate: addReview } = useAddReview();
  const { mutate: updateOrder } = useUpdateOrder();

  const handleReviewSubmit = (data: AddReviewFormValues) => {
    addReview({
      orderId,
      file: data.files,
      data: { rating: data.rating, content: data.review },
    });
    updateOrder({
      orderId: orderId,
      data: {
        orderStatus: perspective === "consumer" ? "FINISHED" : "DELIVERED",
      },
    });
    handleClose();
  };

  return (
    <>
      <ActionWithConfirmation
        confirmOptions={confirmOptions}
        onClick={handleOpen}
        disabled={disabled}
      >
        {children}
      </ActionWithConfirmation>
      <AddReviewModal
        open={open}
        onClose={handleClose}
        onSubmit={handleReviewSubmit}
        perspective={perspective}
        targetId={reviewTargetId}
      />
    </>
  );
};
