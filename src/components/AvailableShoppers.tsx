import type { SxProps } from "@mui/material";
import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
import { BuyingAgent } from "./BuyingAgent";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

type AvailableShoppersProps = {
  sx?: SxProps;
};

export const AvailableShoppers = ({ sx }: AvailableShoppersProps) => {
  return (
    <Box sx={sx}>
      <Stack spacing={3} sx={{ width: "100%" }}>
        {/* 代購者 */}
        <Typography variant="h3" textAlign="center" mt={1}>
          願意代購者
        </Typography>
        <BuyingAgent />
        <BuyingAgent />
        <Box display="flex" justifyContent="center">
          <Link fontSize={18} mt={1}>
            顯示更多
          </Link>
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ "&&": { mt: 5 } }}
      >
        {/* 更多代購者 */}
        <AvatarGroup total={100}>
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <Typography variant="h6" color="base.main">
          另有100位代購者的旅途與此委託相符
        </Typography>
      </Stack>
    </Box>
  );
};
