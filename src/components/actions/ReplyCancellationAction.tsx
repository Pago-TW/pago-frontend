import { useCancellationRecord } from "@/hooks/api/useCancellationRecord";
import { useReplyCancellation } from "@/hooks/api/useReplyCancellation";
import { useOpen } from "@/hooks/useOpen";
import type { Perspective } from "@/types/misc";
import { useRouter } from "next/router";
import type { FC } from "react";
import { ActionButton } from "./ActionButton";
import { ReplyDialog } from "./ReplyDialog";

export type ReplyCancellationActionProps = {
  perspective: Perspective;
  isApplicant: boolean;
};

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
  };

  return (
    <>
      <ActionButton onClick={handleOpen} disabled={isApplicant}>
        {isApplicant ? "等待對方回覆延期申請" : "確認延期申請"}
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
