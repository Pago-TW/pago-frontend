import { useLocale } from "@/hooks/useLocale";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Shopper } from "@/types/order";
import { formatDate } from "@/utils/formatDateTime";
import { Avatar, Box, Paper, Stack } from "@mui/material";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

export type ShopperInfoProps = Pick<
  Shopper,
  "userId" | "avatarUrl" | "fullName" | "latestDeliveryDate"
>;

export const ShopperInfo = ({
  userId,
  avatarUrl,
  fullName,
  latestDeliveryDate,
}: ShopperInfoProps) => {
  const locale = useLocale();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const formattedLatestDeliveryDate = formatDate({
    date: latestDeliveryDate,
    locale,
  });

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
      <Typography variant="h4" as="p">
        將由 {fullName} 為您代購
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
      <Typography variant="h6" color="base.500" as="p">
        預計將於
        {formattedLatestDeliveryDate}
        前送達商品
      </Typography>
    </Paper>
  );
};
