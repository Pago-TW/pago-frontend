import { useState } from "react";

export const useOpen = (initialOpen?: boolean) => {
  const [open, setOpen] = useState(initialOpen ?? false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  };
};
