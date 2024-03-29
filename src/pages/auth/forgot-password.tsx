import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Stack, TextField } from "@mui/material";

import { CenterLayout } from "@/components/layouts/center-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { useRequestPasswordReset } from "@/hooks/api/use-request-password-reset";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const passwordResetMutation = useRequestPasswordReset();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(90);

  useEffect(() => {
    if (countdown === 0) {
      setIsButtonDisabled(false);
    }
  }, [countdown]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    setIsButtonDisabled(true);
    setCountdown(90);
    setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    try {
      await passwordResetMutation.mutateAsync({ email });
    } catch (error) {
      console.error(error);
    }
  };

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
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            required
            value={email}
            onChange={handleEmailChange}
          />
          <Button disabled={isButtonDisabled} onClick={handleSubmit}>
            {isButtonDisabled
              ? `已發送信件 (${countdown}s) `
              : "獲取重設密碼信"}
          </Button>
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
