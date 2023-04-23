import type { CancelFormValues } from "@/components/CancelModal";
import { CancelModal } from "@/components/CancelModal";
import type { PostponeFormValues } from "@/components/PostponeModal";
import { PostponeModal } from "@/components/PostponeModal";
import type { ButtonProps } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOpen } from "@/hooks/useOpen";
import type { Perspective } from "@/types/misc";
import type { StatusCode } from "@/types/order";
import { Paper } from "@mui/material";
import type { ConfirmOptions } from "material-ui-confirm";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";
import { type ReactNode } from "react";

const ActionsWrapper = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <ConfirmProvider>
      <Paper
        elevation={isDesktop ? 0 : 5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-around" },
          gap: { xs: 3, md: 2 },
          px: { xs: 4, md: 0 },
          py: { xs: 2, md: 0 },
          position: { xs: "fixed", md: "static" },
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        {children}
      </Paper>
    </ConfirmProvider>
  );
};

type ActionButtonProps = Pick<
  ButtonProps,
  "variant" | "color" | "disabled" | "children"
> & { onClick?: () => void };
const ActionButton = (props: ActionButtonProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const size = isDesktop ? "large" : "medium";

  return (
    <Button
      size={size}
      sx={{
        minWidth: 0,
        maxWidth: { xs: 144, md: 304 },
        height: { md: 66 },
        flexGrow: 1,
      }}
      {...props}
    />
  );
};

type ActionWithConfirmationProps = Omit<ActionButtonProps, "onClick"> & {
  onClick?: () => void;
  confirmOptions: ConfirmOptions;
};

const DEFAULT_CONFIRM_OPTIONS: ConfirmOptions = {
  cancellationText: "取消",
  confirmationText: "確定",
  buttonOrder: ["confirm", "cancel"],
};

const ActionWithConfirmation = (props: ActionWithConfirmationProps) => {
  const { confirmOptions, onClick, children, ...rest } = props;

  const confirm = useConfirm();

  const handleClick = async () => {
    try {
      await confirm({ ...DEFAULT_CONFIRM_OPTIONS, ...confirmOptions });
      if (onClick) onClick();
    } catch {}
  };

  return (
    <ActionButton onClick={handleClick} {...rest}>
      {children}
    </ActionButton>
  );
};

const DeleteAction = (
  props: Pick<ActionWithConfirmationProps, "disabled" | "onClick">
) => {
  const { disabled, onClick } = props;

  return (
    <ActionWithConfirmation
      disabled={disabled}
      variant="outlined"
      color="error"
      confirmOptions={{ title: "確定刪除委託？" }}
      onClick={onClick}
    >
      刪除委託
    </ActionWithConfirmation>
  );
};

const EditAction = (
  props: Pick<ActionWithConfirmationProps, "disabled" | "onClick">
) => {
  const { disabled, onClick } = props;

  return (
    <ActionWithConfirmation
      disabled={disabled}
      confirmOptions={{
        title: "編輯委託資訊將會使代購者已出價的紀錄刪除，確定要編輯嗎？",
      }}
      onClick={onClick}
    >
      編輯委託
    </ActionWithConfirmation>
  );
};

const CancelAction = (props: {
  disabled?: boolean;
  onClick: (data: CancelFormValues) => void;
}) => {
  const { disabled, onClick } = props;

  const { open, handleOpen, handleClose } = useOpen();
  const confirm = useConfirm();

  const handleClick = async () => {
    handleOpen();
  };
  const handleSubmit = async (data: CancelFormValues) => {
    try {
      handleClose();
      await confirm({ ...DEFAULT_CONFIRM_OPTIONS, title: "確定取消此代購？" });
      if (onClick) onClick(data);
    } catch {}
  };

  return (
    <>
      <ActionButton
        variant="outlined"
        color="error"
        onClick={handleClick}
        disabled={disabled}
      >
        取消委託
      </ActionButton>
      <CancelModal open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );
};

const PostponeAction = (props: {
  disabled?: boolean;
  onClick: (data: PostponeFormValues) => void;
}) => {
  const { disabled, onClick } = props;

  const { open, handleOpen, handleClose } = useOpen();
  const confirm = useConfirm();

  const handleClick = async () => {
    handleOpen();
  };
  const handleSubmit = async (data: PostponeFormValues) => {
    try {
      handleClose();
      await confirm({ ...DEFAULT_CONFIRM_OPTIONS, title: "確定申請延期？" });
      if (onClick) onClick(data);
    } catch {}
  };

  return (
    <>
      <ActionButton
        variant="outlined"
        color="error"
        onClick={handleClick}
        disabled={disabled}
      >
        申請延期
      </ActionButton>
      <PostponeModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const FinishAction = (
  props: Pick<ActionWithConfirmationProps, "disabled" | "onClick">
) => {
  const { disabled, onClick } = props;

  return (
    <ActionWithConfirmation
      disabled={disabled}
      confirmOptions={{ title: "確定完成此訂單？" }}
      onClick={onClick}
    >
      完成委託
    </ActionWithConfirmation>
  );
};

interface ActionsProps {
  perspective: Perspective;
  statusCode: StatusCode;
  onDelete: () => void;
  onEdit: () => void;
  onApplyCancel: (data: CancelFormValues) => void;
  onApplyPostpone: (data: PostponeFormValues) => void;
  onFinish: () => void;
}

export const Actions = (props: ActionsProps) => {
  const {
    perspective,
    statusCode,
    onDelete,
    onEdit,
    onApplyCancel,
    onApplyPostpone,
    onFinish,
  } = props;

  if (perspective === "consumer") {
    const disabled =
      statusCode === "TO_BE_CANCELED" || statusCode === "TO_BE_POSTPONED";

    switch (statusCode) {
      case "REQUESTED":
        return (
          <ActionsWrapper>
            <DeleteAction onClick={onDelete} />
            <EditAction onClick={onEdit} />
          </ActionsWrapper>
        );
      case "TO_BE_PURCHASED":
      case "TO_BE_CANCELED":
        return (
          <ActionsWrapper>
            <CancelAction disabled={disabled} onClick={onApplyCancel} />
            <PostponeAction disabled={disabled} onClick={onApplyPostpone} />
          </ActionsWrapper>
        );
      case "TO_BE_DELIVERED":
      case "DELIVERED":
      case "TO_BE_POSTPONED":
        return (
          <ActionsWrapper>
            <PostponeAction disabled={disabled} onClick={onApplyPostpone} />
            <FinishAction disabled={disabled} onClick={onFinish} />
          </ActionsWrapper>
        );
      case "FINISHED":
      case "CANCELED":
        return null;
    }
  } else {
    return null;
  }
};
