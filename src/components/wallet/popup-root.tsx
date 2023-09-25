import { type ReactNode } from "react";

import { Fade, Modal, Paper, SwipeableDrawer } from "@mui/material";

import { useMediaQuery } from "@/hooks/use-media-query";

export interface PopupRootProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const PopupRoot = ({ open, onClose, children }: PopupRootProps) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  if (isTablet) {
    return (
      <Modal open={open} onClose={onClose} closeAfterTransition>
        <Fade in={open}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90vw",
              minHeight: 440,
              maxWidth: 400,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Paper>
        </Fade>
      </Modal>
    );
  }

  return (
    <SwipeableDrawer
      open={open}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onOpen={() => {}}
      onClose={onClose}
      disableSwipeToOpen
      anchor="bottom"
      PaperProps={{
        sx: {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          minHeight: 440,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};
