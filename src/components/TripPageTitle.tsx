import { Box, Grid, Stack } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import React from "react";
import { BackButton } from "./BackButton";
import { Typography } from "./ui/Typography";
import { useRouter } from "next/router";
import { useDeleteTrip } from "@/hooks/api/useDeleteTrip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ActionWithConfirmation } from "./actions/ActionWithConfirmation";
import DeleteIcon from "@mui/icons-material/Delete";
import { IosShare } from "@mui/icons-material";

export type PageTitleProps = PropsWithChildren<{
  title: ReactNode;
  startButton?: ReactNode;
  endButton?: ReactNode;
}>;

export const TripPageTitle = ({
  title,
  startButton,
  endButton,
  children,
}: PageTitleProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const router = useRouter();
  const tripId = router.query.tripId as string;

  const { mutate: deleteTrip } = useDeleteTrip();

  const handleConfirm = () => {
    deleteTrip({ tripId });
    router.replace("/trips");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      mx={{ xs: 3, sm: 13 }}
      my={{ xs: 3, md: 8 }}
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      spacing={3}
    >
      <Grid container alignItems="center">
        {/* 返回 */}
        <Grid item xs={1} sm={0}>
          {startButton ? (
            startButton
          ) : (
            <Box sx={{ display: { sm: "none" } }}>
              <BackButton />
            </Box>
          )}
        </Grid>
        {/* 頁面名稱 */}
        <Grid item xs={10} sm={12}>
          <Typography
            variant="h1"
            weightPreset="bold"
            textAlign={{ xs: "center", md: "left" }}
          >
            {title}
          </Typography>
        </Grid>
        {/* 分享 */}
        <Grid item xs={1} sm={0}>
          <Box sx={{ display: { sm: "none" } }}>
            {endButton ? (
              <IconButton onClick={handleClick}>{endButton}</IconButton>
            ) : null}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} sx={{ color: "#335891" }}>
                <IosShare />
                分享
              </MenuItem>
              <MenuItem onClick={handleConfirm} sx={{ color: "#bd161d" }}>
                <DeleteIcon />
                刪除
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>
      {children}
    </Stack>
  );
};

export default TripPageTitle;
