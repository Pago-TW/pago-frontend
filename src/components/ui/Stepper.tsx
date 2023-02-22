import { stepConnectorClasses } from "@mui/material/StepConnector";
import type { StepperProps as MuiStepperProps } from "@mui/material/Stepper";
import MuiStepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import { StepConnector } from "./StepConnector";

type StepperProps = MuiStepperProps;

const StyledStepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  [`& .${stepConnectorClasses.root}.${stepConnectorClasses.horizontal}`]: {
    opacity: 0,
    [theme.breakpoints.up("sm")]: {
      opacity: 1,
    },
  },
}));

export const Stepper = ({ connector, ...rest }: StepperProps) => {
  return <StyledStepper connector={connector ?? <StepConnector />} {...rest} />;
};
