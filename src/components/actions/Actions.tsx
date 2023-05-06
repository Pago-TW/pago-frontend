import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Perspective } from "@/types/misc";
import type { OrderStatus } from "@/types/order";
import { Box, Paper } from "@mui/material";
import type { ConfirmOptions } from "material-ui-confirm";
import { ConfirmProvider } from "material-ui-confirm";
import dynamic from "next/dynamic";
import type { FC, ReactNode } from "react";

const DynamicApplyCancelAction = dynamic(() =>
  import("./ApplyCancelAction").then((mod) => mod.ApplyCancelAction)
);
const DynamicApplyPostponeAction = dynamic(() =>
  import("./ApplyPostponeAction").then((mod) => mod.ApplyPostponeAction)
);
const DynamicDeleteAction = dynamic(() =>
  import("./DeleteAction").then((mod) => mod.DeleteAction)
);
const DynamicEditAction = dynamic(() =>
  import("./EditAction").then((mod) => mod.EditAction)
);
const DynamicReplyCancellationAction = dynamic(() =>
  import("./ReplyCancellationAction").then((mod) => mod.ReplyCancellationAction)
);
const DynamicReplyPostponeAction = dynamic(() =>
  import("./ReplyPostponeAction").then((mod) => mod.ReplyPostponeAction)
);
const DynamicTakeOrderAction = dynamic(() =>
  import("./TakeOrderAction").then((mod) => mod.TakeOrderAction)
);
const DynamicUpdateStatusAction = dynamic(() =>
  import("./UpdateStatusAction").then((mod) => mod.UpdateStatusAction)
);

const DEFAULT_CONFIRM_OPTIONS: ConfirmOptions = {
  confirmationText: "是",
  cancellationText: "否",
  buttonOrder: ["confirm", "cancel"],
};

const ActionsWrapper = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <ConfirmProvider defaultOptions={DEFAULT_CONFIRM_OPTIONS}>
      <Paper
        elevation={isDesktop ? 0 : 5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-around" },
          gap: { xs: 3, md: 2 },
          px: { xs: 4, md: 0 },
          py: { xs: 2, md: 0 },
          position: { xs: "fixed", md: "static" },
          left: 0,
          bottom: 0,
          width: "100%",
          "&&": { mt: { xs: 0, md: 5 } },
        }}
      >
        <Box
          width="100%"
          maxWidth={{ xs: 336, md: "none" }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          gap={2}
        >
          {children}
        </Box>
      </Paper>
    </ConfirmProvider>
  );
};

type ConsumerActionsProps = {
  status: Exclude<OrderStatus, "TO_BE_CANCELLED" | "TO_BE_POSTPONED">;
};

const ConsumerActions: FC<ConsumerActionsProps> = ({ status }) => {
  const postponeAction = <DynamicApplyPostponeAction />;

  switch (status) {
    case "REQUESTED":
      return (
        <>
          <DynamicDeleteAction />
          <DynamicEditAction />
        </>
      );
    case "TO_BE_PURCHASED":
      return (
        <>
          <DynamicApplyCancelAction perspective="consumer" />
          {postponeAction}
        </>
      );
    case "TO_BE_DELIVERED":
    case "DELIVERED":
      return (
        <>
          {postponeAction}
          <DynamicUpdateStatusAction
            confirmOptions={{ title: "確定完成此訂單？" }}
            newStatus="FINISHED"
          >
            完成委託
          </DynamicUpdateStatusAction>
        </>
      );
    default:
      return null;
  }
};

type ShopperActionsProps = {
  status: Exclude<OrderStatus, "TO_BE_CANCELLED" | "TO_BE_POSTPONED">;
  isBidder: boolean;
  isShopper: boolean;
};

const ShopperActions: FC<ShopperActionsProps> = ({
  status,
  isBidder,
  isShopper,
}) => {
  if (status === "REQUESTED") {
    return !isBidder ? <DynamicTakeOrderAction /> : null;
  }

  if (!isShopper) return null;

  switch (status) {
    case "TO_BE_PURCHASED":
      return (
        <>
          <DynamicApplyCancelAction perspective="shopper" />
          <DynamicUpdateStatusAction
            confirmOptions={{ title: "確定進入面交流程嗎？" }}
            newStatus="TO_BE_DELIVERED"
          >
            完成委託
          </DynamicUpdateStatusAction>
        </>
      );
    case "TO_BE_DELIVERED":
      return (
        <>
          <DynamicApplyPostponeAction />
          <DynamicUpdateStatusAction
            confirmOptions={{ title: "確定完成此訂單？" }}
            newStatus="TO_BE_DELIVERED"
          >
            完成代購
          </DynamicUpdateStatusAction>
        </>
      );
    default:
      return null;
  }
};

type ActionsProps = Omit<ConsumerActionsProps, "status"> &
  Omit<ShopperActionsProps, "status"> & {
    isApplicant: boolean;
    status: OrderStatus;
    perspective: Perspective;
  };

export const Actions: FC<ActionsProps> = ({
  perspective,
  status,
  isBidder,
  isShopper,
  isApplicant,
}) => {
  let actions;
  if (status === "TO_BE_CANCELLED") {
    if (perspective !== "consumer" && !isShopper) return null;
    actions = (
      <DynamicReplyCancellationAction
        perspective={perspective}
        isApplicant={isApplicant}
      />
    );
  } else if (status === "TO_BE_POSTPONED") {
    if (perspective !== "consumer" && !isShopper) return null;
    actions = (
      <DynamicReplyPostponeAction
        perspective={perspective}
        isApplicant={isApplicant}
      />
    );
  } else {
    actions =
      perspective === "consumer" ? (
        <ConsumerActions status={status} />
      ) : (
        <ShopperActions
          status={status}
          isBidder={isBidder}
          isShopper={isShopper}
        />
      );
  }
  return actions ? <ActionsWrapper>{actions}</ActionsWrapper> : null;
};
