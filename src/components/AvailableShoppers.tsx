import { Avatar, AvatarGroup, Stack } from "@mui/material";

import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import type { Order, OrderShopper } from "@/types/order";

interface AvailableShoppersProps {
  orderId: Order["orderId"];
  shoppers?: OrderShopper[];
  total?: number;
}

export const AvailableShoppers = (props: AvailableShoppersProps) => {
  const { orderId, shoppers, total } = props;

  const hasShoppers = shoppers && shoppers.length !== 0;

  const href = `/orders/${orderId}/shoppers`;

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ "&&": { mt: 5 } }}
    >
      {hasShoppers ? (
        <>
          <AvatarGroup total={total}>
            {shoppers.slice(0, 4).map(({ userId, avatarUrl, fullName }) => (
              <Avatar
                key={userId}
                src={avatarUrl}
                alt={fullName}
                component={Link}
                href={href}
              />
            ))}
          </AvatarGroup>
          <Typography variant="h6" color="base.main">
            <Link href={href}>另有{total}位代購者的旅途與此委託相符</Link>
          </Typography>
          <Button
            variant="outlined"
            size="small"
            LinkComponent={Link}
            href={href}
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          >
            查看
          </Button>
        </>
      ) : (
        <Typography
          variant="h6"
          as="em"
          color="base.main"
          width="100%"
          align="center"
        >
          目前沒有任何旅途與此委託相符 {":("}
        </Typography>
      )}
    </Stack>
  );
};
