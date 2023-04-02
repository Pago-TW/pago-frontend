import { useStepper } from "@/hooks/useStepper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
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
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=48%3A133&t=mZNr7lsf9mXEs4Eq-1",
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
