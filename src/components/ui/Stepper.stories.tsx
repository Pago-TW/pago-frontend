import { useStepper } from "@hooks/useStepper";
import { Box, Stack, Step, Typography } from "@mui/material";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "./Button";
import { StepConnector } from "./StepConnector";
import { StepLabel } from "./StepLabel";
import { Stepper } from "./Stepper";

export default {
  title: "UI/Stepper",
  component: Stepper,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=120%3A3937&t=DkR7YFouQEVF69v4-1",
    },
  },
} as ComponentMeta<typeof Stepper>;

type Story = ComponentStoryObj<typeof Stepper>;

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
    totalSteps: steps.length,
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
