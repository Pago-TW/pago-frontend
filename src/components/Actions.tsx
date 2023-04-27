import type { CancelFormValues } from "@/components/CancelModal";
import { CancelModal } from "@/components/CancelModal";
import type { PostponeFormValues } from "@/components/PostponeModal";
import { PostponeModal } from "@/components/PostponeModal";
import type { ButtonProps } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOpen } from "@/hooks/useOpen";
import type { Perspective } from "@/types/misc";
import type { OrderStatus } from "@/types/order";
import { Box, Paper } from "@mui/material";
import type { ConfirmOptions } from "material-ui-confirm";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";
import type { ComponentType, ReactNode } from "react";

const DEFAULT_CONFIRM_OPTIONS: ConfirmOptions = {
  cancellationText: "取消",
  confirmationText: "確定",
  buttonOrder: ["confirm", "cancel"],
};

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
        <Box
          width="100%"
          maxWidth={{ xs: 336, md: "none" }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          gap={2}
        >
          {children}
        </Box>
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
        minWidth: "fit-content",
        maxWidth: "80%",
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

type ActionWIthModalAndConfirmationProps<T extends object = object> = Omit<
  ActionWithConfirmationProps,
  "onClick"
> & {
  onClick: (data: T) => void;
  Modal: ComponentType<{
    open: boolean;
    onClose: () => void;
    onSubmit: (data: T) => void;
  }>;
};

const ActionWithModalAndConfirmation = <T extends object>(
  props: ActionWIthModalAndConfirmationProps<T>
) => {
  const { confirmOptions, onClick, Modal, children, ...rest } = props;

  const { open, handleOpen, handleClose } = useOpen();
  const confirm = useConfirm();

  const handleClick = async () => handleOpen();

  const handleSubmit = async (data: T) => {
    try {
      handleClose();
      await confirm({ ...DEFAULT_CONFIRM_OPTIONS, ...confirmOptions });
      if (onClick) onClick(data);
    } catch {}
  };

  return (
    <>
      <ActionButton onClick={handleClick} {...rest}>
        {children}
      </ActionButton>
      <Modal open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
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

const CancelAction = (
  props: Pick<
    ActionWIthModalAndConfirmationProps<CancelFormValues>,
    "disabled" | "onClick"
  > & {
    perspective: Perspective;
  }
) => {
  const { disabled, onClick, perspective } = props;

  const handleSubmit = async (data: CancelFormValues) => onClick(data);

  return (
    <ActionWithModalAndConfirmation
        variant="outlined"
        color="error"
        disabled={disabled}
      confirmOptions={{ title: "確定取消此代購？" }}
      onClick={handleSubmit}
      Modal={CancelModal}
      >
      {perspective === "consumer" ? "取消委託" : "取消代購"}
    </ActionWithModalAndConfirmation>
  );
};

const PostponeAction = (
  props: Pick<
    ActionWIthModalAndConfirmationProps<PostponeFormValues>,
    "disabled" | "onClick"
  >
) => {
  const { disabled, onClick } = props;

  const handleSubmit = async (data: PostponeFormValues) => onClick(data);

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

const FinishAction = (
  props: Pick<ActionWithConfirmationProps, "disabled" | "onClick"> & {
    perspective: Perspective;
  }
) => {
  const { disabled, onClick, perspective } = props;

  return (
    <ActionWithConfirmation
      disabled={disabled}
      confirmOptions={{ title: "確定完成此訂單？" }}
      onClick={onClick}
    >
      {perspective === "consumer" ? "完成委託" : "完成代購"}
    </ActionWithConfirmation>
  );
};

interface ActionsProps {
  perspective: Perspective;
  statusCode: OrderStatus;
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
      statusCode === "TO_BE_CANCELLED" || statusCode === "TO_BE_POSTPONED";
  if (perspective === "consumer") {
    switch (statusCode) {
      case "REQUESTED":
        return (
          <ActionsWrapper>
            <DeleteAction onClick={onDelete} />
            <EditAction onClick={onEdit} />
          </ActionsWrapper>
        );
      case "TO_BE_PURCHASED":
      case "TO_BE_CANCELLED":
        return (
          <ActionsWrapper>
            <CancelAction
              disabled={disabled}
              onClick={onApplyCancel}
              perspective={perspective}
            />
            <PostponeAction disabled={disabled} onClick={onApplyPostpone} />
          </ActionsWrapper>
        );
      case "TO_BE_DELIVERED":
      case "DELIVERED":
      case "TO_BE_POSTPONED":
        return (
          <ActionsWrapper>
            <PostponeAction disabled={disabled} onClick={onApplyPostpone} />
            <FinishAction
              disabled={disabled}
              onClick={onFinish}
              perspective={perspective}
            />
          </ActionsWrapper>
        );
      case "FINISHED":
      case "CANCELLED":
        return null;
    }
  } else {
    return null;
  }
};
