import { useCallback, useState } from "react";

export const useDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return {
    dialogOpen,
    handleDialogOpen,
    handleDialogClose,
  };
};
