import type { StepConnectorProps as MuiStepConnectorProps } from "@mui/material";
import { StepConnector as MuiStepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";

type StepConnectorProps = MuiStepConnectorProps;

const StyledStepConnector = styled(MuiStepConnector)<StepConnectorProps>(
  ({ theme }) => ({
    ["& .MuiStepConnector-line"]: {
      borderColor: theme.palette.base.main,
    },
  })
);

export const StepConnector = StyledStepConnector;
