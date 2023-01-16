import { Divider } from "@components/Divider";
import { Header } from "@components/Header";
import { Link } from "@components/Link";
import { Button } from "@components/ui/Button";
import { Typography } from "@components/ui/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
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
      <Typography
        variant="h1"
        weightPreset="bold"
        textAlign="center"
        marginY={4}
      >
        登入 Pago
      </Typography>
      <Paper elevation={3} sx={{ m: "auto", p: 2, maxWidth: 350 }}>
        <Stack sx={{ gap: 3 }}>
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
      </Paper>
    </>
  );
};

export default LoginPage;
