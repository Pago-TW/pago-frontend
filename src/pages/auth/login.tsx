import { Header } from "@components/Header";
import { Button } from "@components/ui/Button";
import { Divider } from "@components/ui/Divider";
import { Link } from "@components/ui/Link";
import { Typography } from "@components/ui/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { NextPage } from "next";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Stack sx={{ maxWidth: 400, mx: "auto", my: "12vh", p: 2, gap: 3 }}>
        <Typography variant="h1" weightPreset="bold" textAlign="center">
          登入
        </Typography>
        <Button variant="outlined" startIcon={<FcGoogle />}>
          使用 Google 繼續
        </Button>
        <Divider>或</Divider>
        <TextField variant="outlined" label="帳號" required />
        <TextField
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="密碼"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
        <Button>登入</Button>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            <Link>忘記密碼？</Link>
          </Typography>
          <Typography variant="h6">
            還沒有帳號嗎？<Link href="/auth/signup">立即註冊</Link>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default LoginPage;
