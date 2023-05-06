import { useAddBid } from "@/hooks/api/useAddBid";
import { useOpen } from "@/hooks/useOpen";
import { useConfirm } from "material-ui-confirm";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { FC } from "react";
import { ActionButton } from "./ActionButton";
import type { TakeOrderFormValues } from "./TakeOrderPopup";

const DynamicTakeOrderPopup = dynamic(() =>
  import("./TakeOrderPopup").then((mod) => mod.TakeOrderPopup)
);

export const TakeOrderAction: FC = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { open, handleOpen, handleClose } = useOpen();

  const confirm = useConfirm();

  const { mutate: addBid } = useAddBid();

  const handleSubmit = async (data: TakeOrderFormValues) => {
    try {
      await confirm({
        title: "確定出價金額是否正確？",
      });
      handleClose();

      addBid({
        orderId,
        data: {
          tripId: data.tripId,
          bidAmount: data.amount,
          currency: data.currency,
          latestDeliveryDate: data.date,
        },
      });
    } catch {}
  };

  return (
    <>
      <ActionButton onClick={handleOpen}>接受委託</ActionButton>
      <DynamicTakeOrderPopup
        orderId={orderId}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};
