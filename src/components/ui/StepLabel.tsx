import {
  StepLabel as MuiStepLabel,
  type StepLabelProps as MuiStepLabelProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type StepLabelProps = MuiStepLabelProps;

const StyledStepLabel = styled(MuiStepLabel)<StepLabelProps>(({ theme }) => ({
  ["& .MuiStepLabel-iconContainer"]: {
    ["& .MuiStepIcon-root"]: {
      color: theme.palette.pago.main,
      ["& .MuiStepIcon-text"]: {
        fontSize: 14,
      },
    },
  },
  ["& .MuiStepLabel-labelContainer"]: {
    ["& .MuiStepLabel-label"]: {
      color: theme.palette.base[800],
      fontSize: 14,
    },
  },
  ["&.Mui-disabled"]: {
    ["& .MuiStepLabel-iconContainer"]: {
      ["& .MuiStepIcon-root"]: {
        color: theme.palette.base.main,
      },
    },
    ["& .MuiStepLabel-labelContainer"]: {
      ["& .MuiStepLabel-label"]: {
        color: theme.palette.base.main,
      },
    },
  },
}));

export const StepLabel = StyledStepLabel;
