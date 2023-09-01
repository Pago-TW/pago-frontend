import { useMediaQuery as useMuiMediaQuery } from "@mui/material";

import type { Theme } from "@/styles/theme";

export const useMediaQuery = useMuiMediaQuery<Theme>;
