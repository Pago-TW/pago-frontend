import { IosShare } from "@mui/icons-material";
import { IconButton, type IconButtonProps } from "@mui/material";

export type ShareButtonProps = Omit<IconButtonProps, "children">;

export const ShareButton = ({ onClick, ...rest }: ShareButtonProps) => {
  const handleClick = onClick
    ? onClick
    : () => navigator.clipboard.writeText(location.href);

  return (
    <IconButton onClick={handleClick} {...rest}>
      <IosShare />
    </IconButton>
  );
};
