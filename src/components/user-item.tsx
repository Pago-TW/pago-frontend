import { type ReactNode } from "react";

import { Stack } from "@mui/material";

import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import { Paper } from "@/components/ui/paper";
import { Typography } from "@/components/ui/typography";
import type { User } from "@/types/user";
import { getUserProfileUrl } from "@/utils/user";

export type UserItemProps = Pick<User, "userId" | "fullName" | "avatarUrl"> & {
  children?: ReactNode;
};

export const UserItem = ({
  userId,
  fullName,
  avatarUrl,
  children,
}: UserItemProps) => {
  const userProfileUrl = getUserProfileUrl(userId);

  return (
    <Paper sx={{ px: 1.5, py: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatarUrl} href={userProfileUrl} />
        <Typography variant="h5" flexGrow={1} noWrap>
          <Link href={userProfileUrl}>{fullName}</Link>
        </Typography>
        {children}
      </Stack>
    </Paper>
  );
};
