// Footer.tsx
import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@/components/ui/Typography";
import { Link } from "@/components/ui/Link";
import { Stack } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box sx={{ paddingBottom: 5 }}>
        <Typography
          variant="h3"
          color="primary.main"
          weightPreset="bold"
          textAlign={{ xs: "center", md: "left" }}
          sx={{ paddingBottom: 2 }}
        >
          Pago
        </Typography>

        <Typography
          variant="h6"
          color="base.500"
          weightPreset="normal"
          textAlign={{ xs: "center", md: "left" }}
        >
          <Stack spacing={2}>
            <Link href="#">會員中心</Link>
            <Link href="#">我的委託</Link>
            <Link href="#">旅途管理</Link>
            <Link href="#">設定</Link>
            <Link href="#">我的收藏</Link>
            <Link href="#">關於我們</Link>
            <Link href="#">幫助中心</Link>
          </Stack>
        </Typography>
      </Box>
      <Box sx={{ paddingBottom: 5 }}>
        <Typography
          variant="h3"
          color="primary.main"
          weightPreset="bold"
          textAlign={{ xs: "center", md: "left" }}
          sx={{ paddingBottom: 2 }}
        >
          相關連結
        </Typography>
        <Typography
          variant="h6"
          color="base.500"
          weightPreset="normal"
          textAlign={{ xs: "center", md: "left" }}
        >
          <Stack spacing={2}>
            <Link href="#">Instagram</Link>
            <Link href="#">Google</Link>
            <Link href="#">Facebook</Link>
          </Stack>
        </Typography>
      </Box>
      <Box sx={{ paddingBottom: 5 }}>
        <Typography
          variant="h3"
          color="primary.main"
          weightPreset="bold"
          textAlign={{ xs: "center", md: "left" }}
          sx={{ paddingBottom: 2 }}
        >
          用戶權益
        </Typography>
        <Typography
          variant="h6"
          color="base.500"
          weightPreset="normal"
          textAlign={{ xs: "center", md: "left" }}
        >
          <Stack spacing={2}>
            <Link href="#">使用者條款</Link>
            <Link href="#">隱私權政策</Link>
          </Stack>
        </Typography>
      </Box>
      <Typography
        variant="h6"
        color="primary.main"
        weightPreset="normal"
        textAlign={{ xs: "center", md: "left" }}
      >
        Copyright © 2023 Pago
      </Typography>
    </Box>
  );
};

export default Footer;
