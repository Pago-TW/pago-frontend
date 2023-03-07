import { ArrowBack, IosShare } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Typography } from "./ui/Typography";

export type PageTitleProps = {
  sharable?: boolean;
  children: ReactNode;
};

export const PageTitle = ({ sharable, children }: PageTitleProps) => {
  const router = useRouter();

  return (
    <Box sx={{ position: "relative" }}>
      {/* 返回 */}
      <IconButton
        sx={{
          display: { sm: "none" },
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onClick={() => router.back()}
      >
        <ArrowBack />
      </IconButton>
      {/* 頁面名稱 */}
      <Typography
        variant="h1"
        weightPreset="bold"
        sx={{
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {children}
      </Typography>
      {sharable ? (
        <IconButton
          sx={{
            display: { sm: "none" },
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <IosShare />
        </IconButton>
      ) : null}
    </Box>
  );
};
