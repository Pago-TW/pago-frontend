import React from "react";

import { Badge, Box } from "@mui/material";

interface UnreadMessageBadgeProps {
  count: number;
}

const UnreadMessageBadge: React.FC<UnreadMessageBadgeProps> = ({ count }) => {
  return (
    <Badge badgeContent={count} color="error" sx={{ marginLeft: "8px" }}>
      <Box sx={{ width: "10px" }} />
    </Badge>
  );
};

export default UnreadMessageBadge;
