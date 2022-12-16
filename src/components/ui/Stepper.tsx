import type { StepperProps as MuiStepperProps } from "@mui/material";
import { Stepper as MuiStepper, styled } from "@mui/material";

type StepperProps = MuiStepperProps;

const StyledStepper = styled(MuiStepper)<StepperProps>();

export const Stepper = StyledStepper;
