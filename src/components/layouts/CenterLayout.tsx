import { useAppbarHeight } from "@hooks/useAppbarHeight";
import { Stack } from "@mui/material";
import { BaseLayout } from "./BaseLayout";

export const CenterLayout = ({ children }: { children: React.ReactNode }) => {
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
