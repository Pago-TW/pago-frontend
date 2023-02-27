import { useAppbarHeight } from "@hooks/useAppbarHeight";
import { Stack } from "@mui/material";

export const FullPageCenter = ({ children }: { children: React.ReactNode }) => {
  const appbarHeight = useAppbarHeight();

  return (
    <Stack
      minHeight={`calc(100vh - ${appbarHeight}px)`}
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Stack>
  );
};
