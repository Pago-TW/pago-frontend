import { PasswordInput } from "@components/inputs/PasswordInput";
import { Container } from "@components/layouts/Container";
import { FullPageCenter } from "@components/layouts/FullPageCenter";
import { Button } from "@components/ui/Button";
import { Divider } from "@components/ui/Divider";
import { Link } from "@components/ui/Link";
import { Typography } from "@components/ui/Typography";
import { Box, Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage: NextPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>登入</title>
      </Head>
      <Container>
        <FullPageCenter>
          <Stack
            spacing={3}
            sx={{ width: "100%", maxWidth: 400, my: "12vh", p: 2 }}
          >
            <Typography variant="h1" weightPreset="bold" textAlign="center">
              登入
            </Typography>
            <Button variant="outlined" startIcon={<FcGoogle />}>
              使用 Google 繼續
            </Button>
            <Divider>或</Divider>
            <TextField variant="outlined" label="帳號" required />
            <PasswordInput label="密碼" ref={passwordRef} />
            <Button>登入</Button>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">
                <Link href="/auth/forgot-password">忘記密碼？</Link>
              </Typography>
              <Typography variant="h6">
                還沒有帳號嗎？<Link href="/auth/signup">立即註冊</Link>
              </Typography>
            </Box>
          </Stack>
        </FullPageCenter>
      </Container>
    </>
  );
};

export default LoginPage;
