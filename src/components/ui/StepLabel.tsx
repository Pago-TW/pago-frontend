import type { StepLabelProps as MuiStepLabelProps } from "@mui/material";
import {
  stepIconClasses,
  StepLabel as MuiStepLabel,
  stepLabelClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type StepLabelProps = MuiStepLabelProps;

const StyledStepLabel = styled(MuiStepLabel)<StepLabelProps>(({ theme }) => ({
  [`& .${stepLabelClasses.iconContainer}`]: {
    [`& .${stepIconClasses.root}`]: {
      color: theme.palette.pago[500],
      [`& .${stepIconClasses.text}`]: {
        fontSize: 14,
      },
    },
  },
  [`& .${stepLabelClasses.labelContainer}`]: {
    [`& .${stepLabelClasses.label}`]: {
      color: theme.palette.base[800],
      fontSize: 14,
    },
  },
  [`&.${stepLabelClasses.disabled}`]: {
    [`& .${stepLabelClasses.iconContainer}`]: {
      [`& .${stepIconClasses.root}`]: {
        color: theme.palette.base[400],
      },
    },
    [`& .${stepLabelClasses.labelContainer}`]: {
      [`& .${stepLabelClasses.label}`]: {
        color: theme.palette.base[400],
      },
    },
  },
}));

export const StepLabel = StyledStepLabel;
