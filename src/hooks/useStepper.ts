import { useState } from "react";

type BaseStep =
  | {
      label: string;
    }
  | string;

export type UseStepperProps<T extends BaseStep> = {
  steps: Readonly<T[]>;
  initialStep?: number;
};

export const useStepper = <T extends BaseStep>({
  steps,
  initialStep = 0,
}: UseStepperProps<T>) => {
  const [activeStep, setActiveStep] = useState<number>(initialStep);

  const activeStepObj = steps[activeStep];

  const totalSteps = steps.length;

  const isFinished = activeStep === totalSteps;

  const handlePrev = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isFinished) {
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return {
    activeStep,
    activeStepObj,
    totalSteps,
    isFinished,
    handlePrev,
    handleNext,
    handleReset,
  };
};
