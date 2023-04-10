import type { StepperProps as MuiStepperProps } from "@mui/material";
import { Stepper as MuiStepper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { StepConnector } from "./StepConnector";

type StepperProps = MuiStepperProps;

const StyledStepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  ["& .MuiStepConnector-root.MuiStepConnector-horizontal"]: {
    opacity: 0,
    [theme.breakpoints.up("sm")]: {
      opacity: 1,
    },
  },
}));

export const Stepper = ({ connector, ...rest }: StepperProps) => {
  return <StyledStepper connector={connector ?? <StepConnector />} {...rest} />;
};
