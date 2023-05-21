import { ArrowBack } from "@mui/icons-material";
import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

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
