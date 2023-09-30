import type { ElementType } from "react";
import Link from "next/link";

import {
  Avatar as MuiAvatar,
  type AvatarProps as MuiAvatarProps,
} from "@mui/material";

export type AvatarProps<C extends ElementType> = MuiAvatarProps<
  C,
  { component?: C }
>;

export const Avatar = <C extends ElementType | typeof Link = typeof Link>({
  component = Link as C,
  ...props
}: AvatarProps<C>) => {
  return <MuiAvatar component={component} {...props} />;
};
