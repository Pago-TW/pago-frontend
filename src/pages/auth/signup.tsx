import { PasswordInput } from "@/components/inputs/PasswordInput";
import { CenterLayout } from "@/components/layouts/CenterLayout";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import { Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";

const SignUpPage: NextPage = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>註冊</title>
      </Head>
      <CenterLayout>
        <Stack
          spacing={3}
          sx={{ width: "100%", maxWidth: 400, my: "12vh", p: 2 }}
        >
          <Typography variant="h1" weightPreset="bold" textAlign="center">
            註冊
          </Typography>
          <TextField variant="outlined" label="帳號" required />
          <PasswordInput label="密碼" ref={passwordRef} />
          <PasswordInput label="確認密碼" ref={confirmPasswordRef} />
          <TextField variant="outlined" label="真實姓名" required />
          <TextField type="tel" variant="outlined" label="手機電話" required />
          <TextField
            type="email"
            variant="outlined"
            label="電子信箱"
            required
          />
          <Button>註冊</Button>
          <Stack>
            <Typography variant="h5" textAlign="center">
              點擊註冊代表您同意Pago的
            </Typography>
            <Typography variant="h5" textAlign="center">
              <Link>會員條款</Link>以及<Link>客戶隱私權條款</Link>
            </Typography>
          </Stack>
          <Typography variant="h6" textAlign="center" color="base.400">
            已經有帳號了嗎？<Link href="/auth/login">點擊登入</Link>
          </Typography>
        </Stack>
      </CenterLayout>
    </>
  );
};

export default SignUpPage;
