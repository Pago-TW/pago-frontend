import { usePostponeRecord } from "@/hooks/api/usePostponeRecord";
import { useReplyPostpone } from "@/hooks/api/useReplyPostpone";
import { useOpen } from "@/hooks/useOpen";
import type { Perspective } from "@/types/misc";
import { useRouter } from "next/router";
import type { FC } from "react";
import { ActionButton } from "./ActionButton";
import { ReplyDialog } from "./ReplyDialog";

export type ReplyPostponeActionProps = {
  perspective: Perspective;
  isApplicant: boolean;
};

export const ReplyPostponeAction: FC<ReplyPostponeActionProps> = ({
  perspective,
  isApplicant,
}) => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { open, handleOpen, handleClose } = useOpen(true);

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
  };

  return (
    <>
      <ActionButton onClick={handleOpen}>
        {isApplicant ? "確認延期申請" : "等待對方回覆延期申請"}
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