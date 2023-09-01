import type { PropsWithChildren } from "react";

import { Stack } from "@mui/material";

import { BaseLayout } from "@/components/layouts/base-layout";
import { useAppbarHeight } from "@/hooks/use-appbar-height";

export type CenterLayoutProps = PropsWithChildren;

export const CenterLayout = ({ children }: CenterLayoutProps) => {
  const appbarHeight = useAppbarHeight();

  return (
    <BaseLayout>
      <Stack
        minHeight={`calc(100vh - ${appbarHeight}px)`}
        justifyContent="center"
        alignItems="center"
        py="10vh"
      >
        {children}
      </Stack>
    </BaseLayout>
  );
};
