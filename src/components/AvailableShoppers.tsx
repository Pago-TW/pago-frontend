import type { Order, Shopper } from "@/types/order";
import { Avatar, AvatarGroup, Stack } from "@mui/material";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

type AvailableShoppersProps = {
  orderId: Order["orderId"];
  shoppers?: Shopper[];
  total: number;
};

export const AvailableShoppers = (props: AvailableShoppersProps) => {
  const { orderId, shoppers, total } = props;

  const hasShoppers = shoppers && shoppers.length !== 0;

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ "&&": { mt: 5 } }}
      component={Link}
      href={`/orders/${orderId}/shoppers`}
    >
      {hasShoppers ? (
        <>
          <AvatarGroup total={total}>
            {shoppers.slice(0, 4).map(({ userId, avatarUrl, fullName }) => (
              <Avatar key={userId} src={avatarUrl} alt={fullName} />
            ))}
          </AvatarGroup>
          <Typography variant="h6" color="base.main">
            另有{total}位代購者的旅途與此委託相符
          </Typography>
        </>
      ) : null}
    </Stack>
  );
};
