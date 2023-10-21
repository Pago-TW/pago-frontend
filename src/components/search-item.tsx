import { type ReactNode } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import HistoryIcon from "@mui/icons-material/History";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export interface SearchItemProps {
  type: "history" | "suggestion";
  content: ReactNode;
}

export const SearchList = ({ type, content }: SearchItemProps) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton sx={{ color: "pago.main", p: 0 }}>
          <ClearIcon />
        </IconButton>
      }
    >
      <ListItemButton
        sx={{
          px: { xs: 6, sm: 2 },
          "& ~ .MuiListItemSecondaryAction-root": {
            right: {
              xs: (theme) => theme.spacing(6),
              sm: (theme) => theme.spacing(2),
            },
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: "pago.main" }}>
          {type === "suggestion" ? <SearchIcon /> : <HistoryIcon />}
        </ListItemIcon>
        <ListItemText primary={content} />
      </ListItemButton>
    </ListItem>
  );
};
