import { type ReactNode, type RefObject } from "react";

import { Modal, Paper } from "@mui/material";

import { useAppbarHeight } from "@/hooks/use-appbar-height";
import { useMediaQuery } from "@/hooks/use-media-query";

export const SearchPopup = ({
  open,
  anchorEl,
  children,
}: {
  open: boolean;
  anchorEl: RefObject<HTMLElement>;
  children: ReactNode;
}) => {
  const navbarHeight = useAppbarHeight();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Modal
      open={open}
      disableAutoFocus
      disableEnforceFocus
      hideBackdrop
      disablePortal
      disableScrollLock={smUp}
      sx={{
        mt: `${navbarHeight}px`,
        position: "fixed",
        top: 0,
        left: { xs: 0, sm: anchorEl.current?.offsetLeft },
      }}
    >
      <Paper
        sx={{
          width: { xs: "100%", sm: anchorEl.current?.clientWidth },
          height: { xs: `calc(100vh - ${navbarHeight}px)`, sm: "auto" },
          maxHeight: { sm: 400 },
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          overflowY: "auto",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
};
