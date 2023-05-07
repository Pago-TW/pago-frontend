import { useAddReview } from "@/hooks/api/useAddReview";
import { useUpdateOrder } from "@/hooks/api/useUpdateOrder";
import { useOpen } from "@/hooks/useOpen";
import type { Perspective } from "@/types/misc";
import type { ConfirmOptions } from "material-ui-confirm";
import { useRouter } from "next/router";
import type { FC } from "react";
import type { ActionWithConfirmationProps } from "./ActionWithConfirmation";
import { ActionWithConfirmation } from "./ActionWithConfirmation";
import type { AddReviewFormValues } from "./AddReviewModal";
import { AddReviewModal } from "./AddReviewModal";

export type FinishActionProps = Pick<
  ActionWithConfirmationProps,
  "disabled" | "children"
> & {
  perspective: Perspective;
  confirmOptions: ConfirmOptions;
};

export const FinishAction: FC<FinishActionProps> = ({
  perspective,
  confirmOptions,
  disabled,
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
      />
    </>
  );
};
