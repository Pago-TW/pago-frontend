import { env } from "@/env/client.mjs";
import { useLanguage } from "@/hooks/useLanguage";
import type { Bid } from "@/types/bid";
import { Star } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack } from "@mui/material";
import { intlFormat, intlFormatDistance, parseISO } from "date-fns";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

type BidItemProps = {
  id: Bid["bidId"];
  amount: Bid["bidAmount"];
  currency: Bid["currency"];
  bidderName: Bid["creator"]["fullName"];
  bidderAvatar: Bid["creator"]["avatarUrl"];
  avgRating: Bid["creator"]["review"]["averageRating"];
  reviewCount: Bid["creator"]["review"]["totalReview"];
  createdAt: Bid["createDate"];
  estDeliveryDate: Bid["latestDeliveryDate"];
};

export const BidItem = (props: BidItemProps) => {
  const lang = useLanguage();

  const {
    id,
    amount,
    currency,
    bidderName,
    bidderAvatar,
    avgRating,
    reviewCount,
    createdAt,
    estDeliveryDate,
  } = props;

  const formattedDistance = intlFormatDistance(
    parseISO(createdAt),
    new Date(),
    { locale: lang }
  );
  const formattedEstDeliveryDate = intlFormat(
    parseISO(estDeliveryDate),
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    },
    { locale: lang }
  );

  const btnLink = `${env.NEXT_PUBLIC_API_URL}/bids/${id}/choose`;

  return (
    <Paper elevation={3} component={Stack} spacing={2} sx={{ p: 2 }}>
      <Box display="flex" alignItems="center">
        <Avatar src={bidderAvatar} />
        <Box display="flex" flexDirection="column" flexGrow={1} ml={2}>
          <Typography variant="h5" noWrap>
            {bidderName}
          </Typography>
          <Box
            color="pago.main"
            display="flex"
            alignItems="center"
            fontSize={14}
          >
            <Star fontSize="inherit" />
            <Typography ml={0.5} fontSize="inherit">
              {avgRating} ({reviewCount}筆評價)
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" color="pago.main">
          {formattedDistance}
        </Typography>
      </Box>
      <Stack spacing={1}>
        <Typography>
          出價: {amount} {currency}
        </Typography>
        <Typography>預計送達時間: {formattedEstDeliveryDate}</Typography>
      </Stack>
      <Button
        variant="outlined"
        size="small"
        LinkComponent={Link}
        href={btnLink}
      >
        接受報價
      </Button>
    </Paper>
  );
};
