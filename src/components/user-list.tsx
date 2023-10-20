import type { ReactElement } from "react";

import { Stack, type StackProps } from "@mui/material";

import type { UserItem } from "@/components/user-item";

export type UserListProps = Omit<StackProps, "children"> & {
  children: ReactElement<typeof UserItem>[];
};

export const UserList = (props: UserListProps) => (
  <Stack gap={{ xs: 3, md: 6 }} {...props} />
);
