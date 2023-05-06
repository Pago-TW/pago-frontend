import type { ConfirmOptions } from "material-ui-confirm";
import { useConfirm } from "material-ui-confirm";
import type { ActionButtonProps } from "./ActionButton";
import { ActionButton } from "./ActionButton";

export type ActionWithConfirmationProps = Omit<ActionButtonProps, "onClick"> & {
  onClick: () => void;
  confirmOptions: ConfirmOptions;
};

export const ActionWithConfirmation = (props: ActionWithConfirmationProps) => {
  const { confirmOptions, onClick, children, ...rest } = props;

  const confirm = useConfirm();

  const handleClick = async () => {
    try {
      await confirm({ ...confirmOptions });
      if (onClick) onClick();
    } catch {}
  };

  return (
    <ActionButton onClick={handleClick} {...rest}>
      {children}
    </ActionButton>
  );
};
