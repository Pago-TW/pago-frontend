import { useState } from "react";

export const useStepper = ({
  totalSteps,
  initialStep = 0,
}: {
  totalSteps: number;
  initialStep?: number;
}) => {
  const [activeStep, setActiveStep] = useState<number>(initialStep);

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
    isFinished,
    handlePrev,
    handleNext,
    handleReset,
  };
};
