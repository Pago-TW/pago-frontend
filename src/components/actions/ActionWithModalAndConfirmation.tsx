import { useOpen } from "@/hooks/useOpen";
import { useConfirm } from "material-ui-confirm";
import type { ComponentType } from "react";
import { ActionButton } from "./ActionButton";
import type { ActionWithConfirmationProps } from "./ActionWithConfirmation";

export type ActionWithModalAndConfirmationProps<
  FormData extends object = object
> = Omit<ActionWithConfirmationProps, "onClick"> & {
  onClick: (data: FormData) => void;
  Modal: ComponentType<{
    open: boolean;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
  }>;
};

export const ActionWithModalAndConfirmation = <FormData extends object>(
  props: ActionWithModalAndConfirmationProps<FormData>
) => {
  const { confirmOptions, onClick, Modal, children, ...rest } = props;

  const { open, handleOpen, handleClose } = useOpen();
  const confirm = useConfirm();

  const handleClick = async () => handleOpen();

  const handleSubmit = async (data: FormData) => {
    try {
      handleClose();
      await confirm({ ...confirmOptions });
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
