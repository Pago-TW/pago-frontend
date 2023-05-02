import { ArrowBackIosNew } from "@mui/icons-material";
import type { IconButtonProps } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

export type BackButtonIosProps = Omit<IconButtonProps, "children"> & {
  onClick?: () => void;
};

export const BackButtonIos = ({ onClick, ...rest }: BackButtonIosProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        color: "primary.main",
        padding: "6px",
        "& .MuiSvgIcon-root": {
          fontSize: "1.25rem",
        },
      }}
      {...rest}
    >
      <ArrowBackIosNew />
    </IconButton>
  );
};
