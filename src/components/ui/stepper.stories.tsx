import { Box, Stack, Step, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";
import { StepConnector } from "@/components/ui/step-connector";
import { StepLabel } from "@/components/ui/step-label";
import { Stepper } from "@/components/ui/stepper";
import { useStepper } from "@/hooks/use-stepper";

export default {
  title: "UI/Stepper",
  component: Stepper,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=48%3A133&t=mZNr7lsf9mXEs4Eq-1",
    },
  },
} as Meta<typeof Stepper>;

type Story = StoryObj<typeof Stepper>;

const steps = [
  {
    label: "Step 1",
    content: "Welcome! This is the 1st step!",
  },
  {
    label: "Step 2",
    content: "Keep moving on! 2nd step already!",
  },
  {
    label: "Step 3",
    content: "Finally! the last step!",
  },
];

const StepperStory = () => {
  const { activeStep, isFinished, handlePrev, handleNext } = useStepper({
    steps,
  });

  return (
    <>
      <Stack spacing={1}>
        <Stepper activeStep={activeStep} connector={<StepConnector />}>
          {steps.map(({ label }) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {isFinished ? (
          <Typography>Congrats! You{"'"}ve done all the steps!</Typography>
        ) : (
          <Typography>{steps[activeStep]?.content}</Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => handlePrev()}>Prev</Button>
          <Button onClick={() => handleNext()}>Next</Button>
        </Box>
      </Stack>
    </>
  );
};

export const Default: Story = {
  render: () => <StepperStory />,
};
