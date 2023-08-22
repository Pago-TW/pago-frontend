import type { ComponentProps, ReactNode } from "react";

import { ButtonBase, styled } from "@mui/material";

const FilterButtonRoot = styled(ButtonBase)(({ theme }) => ({
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: theme.palette.base[500],
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  gap: 4,
  width: 100,
  padding: theme.spacing(0.5),
}));

const FilterButtonText = styled("span")(({ theme }) => ({
  color: theme.palette.base[800],
  fontSize: 14,
  flexGrow: 1,
  textAlign: "center",
}));

const FilterButtonIcon = styled("span")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    color: theme.palette.pago.main,
    transition: theme.transitions.create("all", { duration: ".25s" }),
  },
}));

export type FilterButtonProps = ComponentProps<typeof FilterButtonRoot> & {
  endIcon: ReactNode;
};

export const FilterButton = ({
  endIcon,
  children,
  ...rest
}: FilterButtonProps) => {
  return (
    <FilterButtonRoot {...rest}>
      <FilterButtonText>{children}</FilterButtonText>
      <FilterButtonIcon>{endIcon}</FilterButtonIcon>
    </FilterButtonRoot>
  );
};
