import { useLanguage } from "@/hooks/useLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Shopper } from "@/types/order";
import { Avatar, Box, Paper, Stack } from "@mui/material";
import { intlFormat, parseISO } from "date-fns";
import { Button } from "./ui/Button";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

export type ChosenShopperProps = Shopper;

export const ChosenShopper = (props: ChosenShopperProps) => {
  const { userId, avatarUrl, fullName, latestDeliveryDate } = props;

  const lang = useLanguage();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const formattedLatestDeliveryDate = intlFormat(
    parseISO(latestDeliveryDate),
    { year: "numeric", month: "numeric", day: "numeric" },
    { locale: lang }
  );

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
          href={`/user/${userId}`}
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
