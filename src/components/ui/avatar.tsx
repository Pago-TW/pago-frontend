import Link, { type LinkProps } from "next/link";

import {
  Avatar as MuiAvatar,
  type AvatarProps as MuiAvatarProps,
} from "@mui/material";

export interface AvatarProps extends MuiAvatarProps {
  href?: LinkProps["href"];
}

export const Avatar = ({ ...props }: AvatarProps) => {
  if (props.href) return <MuiAvatar component={Link} {...props} />;
  return <MuiAvatar {...props} />;
};
