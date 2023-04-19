import { Star } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack } from "@mui/material";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";

export const BidItem = () => (
  <Paper elevation={3} component={Stack} spacing={2} sx={{ p: 2 }}>
    <Box display="flex" alignItems="center">
      <Avatar />
      <Box display="flex" flexDirection="column" flexGrow={1} ml={2}>
        <Typography variant="h5" noWrap>
          使用者名稱
        </Typography>
        <Box color="pago.main" display="flex" alignItems="center" fontSize={14}>
          <Star fontSize="inherit" />
          <Typography ml={0.5} fontSize="inherit">
            4.7 (28筆評價)
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" color="pago.main">
        5小時前
      </Typography>
    </Box>
    <Stack spacing={1}>
      <Typography>出價: NT$85</Typography>
      <Typography>預計送達時間: 11/14/2022 11:20AM</Typography>
    </Stack>
    <Button variant="outlined" size="small">
      接受報價
    </Button>
  </Paper>
);
