import { Box, Paper, Stack } from "@mui/material";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useChatroomStore } from "@/store/ui/use-chatroom-store";
import type { Perspective } from "@/types/misc";
import type { OrderShopper, OrderUser } from "@/types/order";
import { formatDate } from "@/utils/date";
import { getUserProfileUrl } from "@/utils/user";

export type UserCardProps = Pick<
  OrderUser,
  "userId" | "avatarUrl" | "fullName"
> &
  Partial<Pick<OrderShopper, "latestDeliveryDate">> & {
    perspective: Perspective;
  };

export const UserCard = ({
  userId,
  avatarUrl,
  fullName,
  latestDeliveryDate,
  perspective,
}: UserCardProps) => {
  const setOpen = useChatroomStore((state) => state.setOpen);
  const setChatWith = useChatroomStore((state) => state.setChatWith);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const perspectiveMsg = perspective === "consumer" ? "代購者" : "委託者";

  let latestDeliveryDateElem;
  if (latestDeliveryDate) {
    const formattedLatestDeliveryDate = formatDate(latestDeliveryDate);
    const latestDeliveryDateMsg =
      perspective === "consumer"
        ? `預計將於 ${formattedLatestDeliveryDate} 前購買並面交商品`
        : `請於 ${formattedLatestDeliveryDate} 前購買並面交商品`;
    latestDeliveryDateElem = (
      <Typography variant="h6" color="base.500" as="p">
        {latestDeliveryDateMsg}
      </Typography>
    );
  }

  const handleSendMessageClick = () => {
    setOpen(true);
    setChatWith(userId);
  };

  return (
    <Paper
      elevation={3}
      component={Stack}
      spacing={isDesktop ? 5 : 2}
      pt={2.5}
      px={2}
      pb={1.5}
      alignItems="center"
    >
      <Typography variant="h4" as="p" noWrap>
        {perspectiveMsg}
      </Typography>
      <Box width="100%" display="flex" alignItems="center" gap={2}>
        <Avatar src={avatarUrl} href={getUserProfileUrl(userId)} />
        <Typography variant="h5" as="p" noWrap flexGrow={1}>
          {fullName}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleSendMessageClick}
        >
          傳送訊息
        </Button>
      </Box>
      {latestDeliveryDateElem}
    </Paper>
  );
};
