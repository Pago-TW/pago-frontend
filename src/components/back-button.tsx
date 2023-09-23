import { useRouter } from "next/router";

import { ArrowBack } from "@mui/icons-material";
import { IconButton, type IconButtonProps } from "@mui/material";

export type BackButtonProps = Omit<IconButtonProps, "children">;

export const BackButton = ({ onClick, ...rest }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = onClick ? onClick : () => router.back();

  return (
    <IconButton onClick={handleClick} {...rest}>
      <ArrowBack />
    </IconButton>
  );
};
