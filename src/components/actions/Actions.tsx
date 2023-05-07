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
        <ActionsWrapper>
          <DynamicDeleteAction />
          <DynamicEditAction />
        </ActionsWrapper>
      );
    case "TO_BE_PURCHASED":
      return (
        <ActionsWrapper>
          <DynamicApplyCancelAction perspective="consumer" />
          {postponeAction}
        </ActionsWrapper>
      );
    case "TO_BE_DELIVERED":
    case "DELIVERED":
      return (
        <ActionsWrapper>
          {postponeAction}
          <DynamicUpdateStatusAction
            confirmOptions={{ title: "確定完成此訂單？" }}
            newStatus="FINISHED"
          >
            完成委託
          </DynamicUpdateStatusAction>
        </ActionsWrapper>
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
    return !isBidder ? (
      <ActionsWrapper>
        <DynamicTakeOrderAction />
      </ActionsWrapper>
    ) : null;
  }

  if (!isShopper) return null;

  switch (status) {
    case "TO_BE_PURCHASED":
      return (
        <ActionsWrapper>
          <DynamicApplyCancelAction perspective="shopper" />
          <DynamicUpdateStatusAction
            confirmOptions={{ title: "確定進入面交流程嗎？" }}
            newStatus="TO_BE_DELIVERED"
          >
            準備面交
          </DynamicUpdateStatusAction>
        </ActionsWrapper>
      );
    case "TO_BE_DELIVERED":
      return (
        <ActionsWrapper>
          <DynamicApplyPostponeAction />
          <DynamicUpdateStatusAction
            confirmOptions={{ title: "確定完成此訂單？" }}
            newStatus="DELIVERED"
          >
            完成代購
          </DynamicUpdateStatusAction>
        </ActionsWrapper>
      );
    default:
      return null;
  }
};

type ActionsProps = Omit<ConsumerActionsProps, "status"> &
  Omit<ShopperActionsProps, "status"> & {
    status: OrderStatus;
    isApplicant: boolean;
    perspective: Perspective;
  };

export const Actions: FC<ActionsProps> = ({
  perspective,
  status,
  isBidder,
  isShopper,
  isApplicant,
}) => {
  if (status === "TO_BE_CANCELLED") {
    if (perspective !== "consumer" && !isShopper) return null;
    return (
      <ActionsWrapper>
        <DynamicReplyCancellationAction
          perspective={perspective}
          isApplicant={isApplicant}
        />
      </ActionsWrapper>
    );
  }
  if (status === "TO_BE_POSTPONED") {
    if (perspective !== "consumer" && !isShopper) return null;
    return (
      <ActionsWrapper>
        <DynamicReplyPostponeAction
          perspective={perspective}
          isApplicant={isApplicant}
        />
      </ActionsWrapper>
    );
  }

  return perspective === "consumer" ? (
    <ConsumerActions status={status} />
  ) : (
    <ShopperActions status={status} isBidder={isBidder} isShopper={isShopper} />
  );
};
