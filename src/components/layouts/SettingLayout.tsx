import type { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  alpha,
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { BaseLayout } from "@/components/BaseLayout";
import { PageTitle } from "@/components/PageTitle";

const settingRoutes = [
  { name: "編輯個人資料", href: "/users/me/settings/profile" },
  { name: "變更密碼", href: "/users/me/settings/password" },
] as const;

export type SettingLayoutProps = PropsWithChildren;

export const SettingLayout = ({ children }: SettingLayoutProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  const activating = children !== undefined;

  return (
    <BaseLayout>
      <PageTitle title="設定" />
      <Box px={{ xs: "5vw", md: "7vw" }}>
        <Grid container gap={{ xs: 2, md: 4 }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={[activating && { display: { xs: "none", md: "block" } }]}
          >
            <List
              disablePadding
              sx={{
                backgroundColor: (theme) => theme.palette.common.white,
                borderRadius: 2.5,
                overflow: "hidden",
                "& .MuiListItemButton-root:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.pago[25], 0.2),
                },
                "& .MuiListItemButton-root.Mui-selected": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.pago[200], 0.25),
                },
                "& .MuiListItemButton-root.Mui-selected:hover": {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.pago[200], 0.35),
                },
              }}
            >
              {settingRoutes.map(({ name, href }) => (
                <ListItemButton
                  key={`${name}-${href}`}
                  LinkComponent={Link}
                  href={href}
                  selected={pathname === href}
                >
                  <ListItemText>{name}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          </Grid>
          <Grid item xs>
            {children}
          </Grid>
        </Grid>
      </Box>
    </BaseLayout>
  );
};
