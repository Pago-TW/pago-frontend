import type { StepConnectorProps as MuiStepConnectorProps } from "@mui/material/StepConnector";
import MuiStepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

type StepConnectorProps = MuiStepConnectorProps;

const StyledStepConnector = styled(MuiStepConnector)<StepConnectorProps>(
  ({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.base[400],
    },
  })
);

export const StepConnector = StyledStepConnector;
