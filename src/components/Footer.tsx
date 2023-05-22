// Footer.tsx
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Stack } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateRows: { xs: "auto 1fr", md: "1fr" },
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        alignItems: { xs: "center", md: "start" },
        justifyContent: "center",
        padding: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          paddingBottom: { xs: 5, md: 0 },
          paddingRight: { md: 5 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems="flex-start">
          <Box>
            <Typography
              variant="h3"
              color="primary.main"
              weightPreset="bold"
              textAlign={"center"}
            >
              Pago
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="base.500" weightPreset="normal">
              <Stack spacing={2}>
                <Link href="/users/me">會員中心</Link>
                <Link href="/orders">我的委託</Link>
                <Link href="/trips">旅途管理</Link>
                <Link href="/users/me/setting">設定</Link>
                <Link href="#">我的收藏</Link>
                <Link href="/about-us">關於我們</Link>
              </Stack>
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          paddingBottom: { xs: 5, md: 0 },
          paddingRight: { md: 5 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems="flex-start">
          <Box>
            <Typography
              variant="h3"
              color="primary.main"
              weightPreset="bold"
              textAlign={"center"}
            >
              相關連結
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="base.500" weightPreset="normal">
              <Link href="https://www.instagram.com/pago.tw/">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <InstagramIcon />
                  <Box sx={{ marginLeft: "9px" }}>Instagram</Box>
                </Box>
              </Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="base.500" weightPreset="normal">
              <Link href="mailto:pago.service.me@gmail.com">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <GoogleIcon />
                  <Box sx={{ marginLeft: "9px" }}>Google</Box>
                </Box>
              </Link>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="base.500" weightPreset="normal">
              <Link href="https://www.facebook.com/pago.service.me">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FacebookRoundedIcon />
                  <Box sx={{ marginLeft: "9px" }}>Facebook</Box>
                </Box>
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          paddingBottom: 5,
          paddingRight: { md: 5 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems="flex-start">
          <Box>
            <Typography
              variant="h3"
              color="primary.main"
              weightPreset="bold"
              textAlign={"center"}
            >
              用戶權益
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="base.500" weightPreset="normal">
              <Stack spacing={2}>
                <Link href="#">使用者條款</Link>
                <Link href="#">隱私權政策</Link>
              </Stack>
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingTop: 2,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography variant="body1" color="base.500">
          聯絡信箱：pago.service.me@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
