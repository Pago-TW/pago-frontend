import type { FC } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useConfirm } from "material-ui-confirm";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { ActionButton } from "@/components/actions/ActionButton";
import type { TakeOrderFormValues } from "@/components/actions/TakeOrderPopup";
import { CloseSnackbarButton } from "@/components/CloseSnackbarButton";
import { Button } from "@/components/ui/Button";
import { useAddBid } from "@/hooks/api/useAddBid";
import { useOpen } from "@/hooks/useOpen";

const DynamicTakeOrderPopup = dynamic(() =>
  import("./TakeOrderPopup").then((mod) => mod.TakeOrderPopup)
);

export const TakeOrderAction: FC = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { data: session } = useSession();

  const { open, handleOpen, handleClose } = useOpen();

  const confirm = useConfirm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { mutate: addBid } = useAddBid();

  const handleActionClick = () => {
    if (session?.user?.verified) {
      handleOpen();
      return;
    }

    enqueueSnackbar({
      message: "尚未綁定銀行帳戶",
      variant: "warning",
      action: (key) => (
        <>
          <Button
            variant="text"
            onClick={() => {
              void router.push({
                pathname: "/users/me/payments/new",
                query: { redirectUrl: router.asPath },
              });
              closeSnackbar(key);
            }}
          >
            前往綁定
          </Button>
          <CloseSnackbarButton snackbarKey={key} />
        </>
      ),
    });
  };
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
      <ActionButton onClick={handleActionClick}>接受委託</ActionButton>
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
