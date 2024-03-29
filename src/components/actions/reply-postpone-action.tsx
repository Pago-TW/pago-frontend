import type { FC } from "react";
import { useRouter } from "next/router";

import { ActionButton } from "@/components/actions/action-button";
import { ReplyDialog } from "@/components/actions/reply-dialog";
import { usePostponeRecord } from "@/hooks/api/use-postpone-record";
import { useReplyPostpone } from "@/hooks/api/use-reply-postpone";
import { useOpen } from "@/hooks/use-open";
import type { Perspective } from "@/types/misc";

export interface ReplyPostponeActionProps {
  perspective: Perspective;
  isApplicant: boolean;
}

export const ReplyPostponeAction: FC<ReplyPostponeActionProps> = ({
  perspective,
  isApplicant,
}) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { open, handleOpen, handleClose } = useOpen(!isApplicant);

  const { data: postponeRecord, isLoading } = usePostponeRecord(orderId, {
    enabled: open,
    refetchOnWindowFocus: false,
  });

  const { mutate: replyPostpone } = useReplyPostpone();

  const handleReply = (isPostponed: boolean) => {
    replyPostpone({
      orderId,
      data: { isPostponed },
    });
    handleClose();
  };

  return (
    <>
      <ActionButton onClick={handleOpen} disabled={isApplicant}>
        {isApplicant ? "等待對方回覆延期申請" : "確認延期申請"}
      </ActionButton>
      <ReplyDialog
        open={open}
        onClose={handleClose}
        applyFor="postpone"
        perspective={perspective}
        reason={postponeRecord?.postponeReason}
        note={postponeRecord?.note}
        isLoading={isLoading}
        onCancel={() => handleReply(false)}
        onConfirm={() => handleReply(true)}
      />
    </>
  );
};
