import { ArrowBack, IosShare } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import { Typography } from "./ui/Typography";

type PageTitleProps = {
  title: string;
  sharable?: boolean;
};

export const PageTitle = ({ title, sharable }: PageTitleProps) => {
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
        {title}
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
