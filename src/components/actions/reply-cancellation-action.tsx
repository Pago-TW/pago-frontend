import type { FC } from "react";
import { useRouter } from "next/router";

import { ActionButton } from "@/components/actions/action-button";
import { ReplyDialog } from "@/components/actions/reply-dialog";
import { useCancellationRecord } from "@/hooks/api/use-cancellation-record";
import { useReplyCancellation } from "@/hooks/api/use-reply-cancellation";
import { useOpen } from "@/hooks/use-open";
import type { Perspective } from "@/types/misc";

export interface ReplyCancellationActionProps {
  perspective: Perspective;
  isApplicant: boolean;
}

export const ReplyCancellationAction: FC<ReplyCancellationActionProps> = ({
  perspective,
  isApplicant,
}) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { open, handleOpen, handleClose } = useOpen(!isApplicant);

  const { data: cancellationRecord, isLoading } = useCancellationRecord(
    orderId,
    { enabled: open, refetchOnWindowFocus: false }
  );

  const { mutate: replyCancellation } = useReplyCancellation();

  const handleReply = (isCancelled: boolean) => {
    replyCancellation({
      orderId,
      data: { isCancelled },
    });
    handleClose();
  };

  return (
    <>
      <ActionButton onClick={handleOpen} disabled={isApplicant}>
        {isApplicant ? "等待對方回覆取消申請" : "確認取消申請"}
      </ActionButton>
      <ReplyDialog
        open={open}
        onClose={handleClose}
        applyFor="cancel"
        perspective={perspective}
        reason={cancellationRecord?.cancelReason}
        note={cancellationRecord?.note}
        isLoading={isLoading}
        onCancel={() => handleReply(false)}
        onConfirm={() => handleReply(true)}
      />
    </>
  );
};
