import type { StepConnectorProps as MuiStepConnectorProps } from "@mui/material";
import {
  StepConnector as MuiStepConnector,
  stepConnectorClasses,
  styled,
} from "@mui/material";

type StepConnectorProps = MuiStepConnectorProps;

const StyledStepConnector = styled(MuiStepConnector)<StepConnectorProps>(
  ({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.base[400],
    },
  })
);

export const StepConnector = StyledStepConnector;
