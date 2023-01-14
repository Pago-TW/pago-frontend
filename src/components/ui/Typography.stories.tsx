import { Box } from "@mui/material";
import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Typography } from "./Typography";
export default {
  title: "UI/Typography",
  component: Typography,
  argTypes: {
    children: {
      defaultValue: "Typography",
    },
  },
} as ComponentMeta<typeof Typography>;

type Story = ComponentStoryObj<typeof Typography>;

const FontWeightStory = () => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Typography weightPreset="light">Aa</Typography>
      <Typography weightPreset="normal">Aa</Typography>
      <Typography weightPreset="bold">Aa</Typography>
    </Box>
  );
};

export const FontWeight: Story = {
  render: () => <FontWeightStory />,
};
