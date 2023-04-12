import { CenterLayout } from "@/components/layouts/CenterLayout";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import { Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

const ForgotPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>忘記密碼</title>
      </Head>
      <CenterLayout>
        <Stack
          spacing={3}
          sx={{ width: "100%", maxWidth: 400, my: "12vh", p: 2 }}
        >
          <Typography variant="h1" weightPreset="bold" textAlign="center">
            忘記密碼
          </Typography>
          <Typography variant="h4" color="base.main" textAlign="center">
            輸入 Email 以重設密碼
          </Typography>
          <TextField variant="outlined" type="email" label="Email" required />
          <Button>獲取信件</Button>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h5" color="base.main">
              <Link href="/auth/signin">登入</Link>
              {" / "}
              <Link href="/auth/signup">註冊</Link>
            </Typography>
          </Stack>
        </Stack>
      </CenterLayout>
    </>
  );
};

export default ForgotPasswordPage;
