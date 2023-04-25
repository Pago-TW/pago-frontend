import type { WithRequired } from "@/types/util";
import { Favorite } from "@mui/icons-material";
import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";

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
