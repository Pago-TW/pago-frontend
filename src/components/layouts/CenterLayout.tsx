import { useAppbarHeight } from "@/hooks/useAppbarHeight";
import { Stack } from "@mui/material";
import type { PropsWithChildren } from "react";
import { BaseLayout } from "./BaseLayout";

export type CenterLayoutProps = PropsWithChildren;

export const CenterLayout = ({ children }: CenterLayoutProps) => {
  const appbarHeight = useAppbarHeight();

  return (
    <BaseLayout>
      <Stack
        minHeight={`calc(100vh - ${appbarHeight}px)`}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Stack>
    </BaseLayout>
  );
};
