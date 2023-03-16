import { Stack } from "@mui/material";
import type { Order } from "./OrderItem";
import { OrderItem } from "./OrderItem";
import { Link } from "./ui/Link";

export type OrderListProps = {
  items: Order[];
};

export const OrderList = ({ items }: OrderListProps) => {
  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Link key={item.orderId} href={`/orders/${item.orderId}`}>
          <OrderItem {...item} />
        </Link>
      ))}
    </Stack>
  );
};

export default OrderList;
