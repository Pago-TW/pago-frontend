import { Avatar, Paper, Stack } from "@mui/material";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";

export const BuyingAgent = () => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Stack direction="row" alignItems="center">
      <Avatar />
      {/* 使用者名稱 */}
      <Typography variant="h5" ml={2} noWrap sx={{ mr: "auto" }}>
        使用者名稱
      </Typography>
      <Button variant="outlined" size="small" sx={{ ml: 1 }}>
        查看代購者詳情
      </Button>
    </Stack>
  </Paper>
);
