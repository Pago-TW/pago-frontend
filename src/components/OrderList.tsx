import { Link, Stack } from "@mui/material";
import type { Order } from "./OrderItem";
import { OrderItem } from "./OrderItem";

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
