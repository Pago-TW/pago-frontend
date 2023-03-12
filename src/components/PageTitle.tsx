import { Grid, Stack } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import { BackButton } from "./BackButton";
import { Typography } from "./ui/Typography";

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
            <BackButton sx={{ display: { sm: "none" } }} />
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
          {endButton ? endButton : null}
        </Grid>
      </Grid>
      {children}
    </Stack>
  );
};

export default PageTitle;
