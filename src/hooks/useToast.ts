import { useCallback, useState } from "react";

type ToastState = {
  open: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
};

const initialState: ToastState = {
  open: false,
  message: "",
  severity: undefined,
};

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>(initialState);

  const openToast = useCallback(
    (newState: Omit<ToastState, "open">) =>
      setToast({ open: true, ...newState }),
    []
  );

  const closeToast = useCallback(
    () => setToast((prev) => ({ ...prev, open: false })),
    []
  );

  return {
    ...toast,
    openToast,
    closeToast,
  };
};
