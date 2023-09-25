import { useState, type MouseEvent } from "react";

import { ExpandMore } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

import { Button } from "@/components/ui/button";
import { type TransactionQuery } from "@/hooks/api/use-transaction-queries";

export const TransactionYearDropdown = ({
  queries,
  year,
  onYearChange,
}: {
  queries?: Record<string, TransactionQuery[]>;
  year?: string;
  onYearChange: (year: string) => void;
}) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchor);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const handleItemClick = (year: string) => () => {
    onYearChange(year);
    handleClose();
  };

  if (!queries || !year) return null;

  const availableYears = Object.keys(queries).reverse();

  return (
    <>
      <Button
        size="small"
        variant="text"
        sx={{
          minWidth: 0,
          px: 1,
          fontSize: (theme) => theme.typography.pxToRem(18),
        }}
        onClick={handleOpen}
      >
        {year} <ExpandMore />
      </Button>
      <Menu anchorEl={anchor} open={menuOpen} onClose={handleClose}>
        {availableYears.map((year) => (
          <MenuItem key={year} onClick={handleItemClick(year)}>
            {year}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
