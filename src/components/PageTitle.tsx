import { ArrowBack, IosShare } from "@mui/icons-material";
import { Grid, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Typography } from "./ui/Typography";

export type PageTitleProps = {
  title: ReactNode;
  sharable?: boolean;
  onBack?: () => void;
  children?: ReactNode;
};

export const PageTitle = ({
  title,
  sharable,
  onBack,
  children,
}: PageTitleProps) => {
  const router = useRouter();

  const handleBack = onBack ? onBack : () => router.back();

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
          <IconButton sx={{ display: { sm: "none" } }} onClick={handleBack}>
            <ArrowBack />
          </IconButton>
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
          {sharable ? (
            <IconButton sx={{ display: { sm: "none" } }}>
              <IosShare />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      {children}
    </Stack>
  );
};

export default PageTitle;
