import { Favorite } from "@mui/icons-material";
import { IconButton, type IconButtonProps } from "@mui/material";

import type { WithRequired } from "@/types/util";

export type FavoriteButtonProps = WithRequired<
  Omit<IconButtonProps, "children">,
  "onClick"
>;

export const FavoriteButton = (props: FavoriteButtonProps) => {
  return (
    <IconButton {...props}>
      <Favorite />
    </IconButton>
  );
};
