import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useOpen } from "./useOpen";

export const useReturnableOpen = () => {
  const router = useRouter();

  const { open, setOpen } = useOpen();

  const handleOpen = () => {
    setOpen(true);
    router.push(router.asPath, undefined, { shallow: true });
  };
  const handleClose = useCallback(() => {
    setOpen(false);
    router.back();
  }, [router, setOpen]);

  useEffect(() => {
    if (open) window.addEventListener("popstate", handleClose);
    return () => window.removeEventListener("popstate", handleClose);
  }, [handleClose, open]);

  return {
    open,
    handleOpen,
    handleClose,
    setOpen,
  };
};
