import { useLocale } from "@/hooks/useLocale";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Perspective } from "@/types/misc";
import type { OrderShopper, OrderUser } from "@/types/order";
import { formatDate } from "@/utils/formatDateTime";
import { Avatar, Box, Paper, Stack } from "@mui/material";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

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
  const locale = useLocale();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const perspectiveMsg =
    perspective === "consumer"
      ? `將由 ${fullName} 進行代購`
      : `將為 ${fullName} 進行代購`;

  let latestDeliveryDateElem;
  if (latestDeliveryDate) {
    const formattedLatestDeliveryDate = formatDate({
      date: latestDeliveryDate,
      locale,
    });
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
        <Avatar src={avatarUrl} />
        <Typography variant="h5" as="p" noWrap flexGrow={1}>
          {fullName}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          LinkComponent={Link}
          href={`/users/${userId}`}
        >
          查看代購者詳情
        </Button>
      </Box>
      {latestDeliveryDateElem}
    </Paper>
  );
};
