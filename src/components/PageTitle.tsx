import type { PropsWithChildren, ReactNode } from "react";

import { Box, Grid, Stack } from "@mui/material";

import { BackButton } from "@/components/BackButton";
import { Typography } from "@/components/ui/Typography";

export type PageTitleProps = PropsWithChildren<{
  title: ReactNode;
  startButton?: ReactNode;
  endButton?: ReactNode;
}>;

export const PageTitle = ({
  title,
  startButton,
  endButton,
  children,
}: PageTitleProps) => {
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
            {endButton ? endButton : null}
          </Box>
        </Grid>
      </Grid>
      {children}
    </Stack>
  );
};

export default PageTitle;
