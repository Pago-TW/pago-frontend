import { Stack } from "@mui/material";

import { OrderItem, type OrderItemProps } from "@/components/OrderItem";
import { Link } from "@/components/ui/Link";
import type { Order } from "@/types/order";

export type OrderListProps = Pick<OrderItemProps, "variant"> & {
  items: Order[];
};

export const OrderList = ({ variant, items }: OrderListProps) => {
  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Link key={item.orderId} href={`/orders/${item.orderId}`}>
          <OrderItem
            orderStatus={item.orderStatus}
            currency={item.currency}
            travelerFee={item.travelerFee}
            totalAmount={item.totalAmount}
            latestReceiveItemDate={item.latestReceiveItemDate}
            destinationCountryCode={item.destinationCountryCode}
            destinationCityCode={item.destinationCityCode}
            destinationCountryName={item.destinationCountryName}
            destinationCityName={item.destinationCityName}
            isPackagingRequired={item.isPackagingRequired}
            name={item.orderItem.name}
            description={item.orderItem.description}
            quantity={item.orderItem.quantity}
            fileUrls={item.orderItem.fileUrls}
            purchaseCountryName={item.orderItem.purchaseCountryName}
            purchaseCityName={item.orderItem.purchaseCityName}
            purchaseCountryCode={item.orderItem.purchaseCountryCode}
            purchaseCityCode={item.orderItem.purchaseCityCode}
            createDate={item.createDate}
            variant={variant}
          />
        </Link>
      ))}
    </Stack>
  );
};

export default OrderList;
