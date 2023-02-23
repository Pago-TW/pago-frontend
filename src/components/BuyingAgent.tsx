import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";

export const BuyingAgent = () => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Stack direction="row" alignItems="center">
      <Avatar />
      {/* 使用者名稱 */}
      <Typography variant="h5" ml={2} noWrap>
        使用者名稱
      </Typography>
      <Button variant="outlined" size="small" sx={{ ml: "auto" }}>
        查看代購者詳情
      </Button>
    </Stack>
  </Paper>
);
