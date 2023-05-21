import Box from "@mui/material/Box";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
export default {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=0%3A1&t=4QlV7gnKJWSXxMlM-1",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "body1",
        "body2",
        "button",
        "caption",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "inherit",
        "overline",
        "subtitle1",
        "subtitle2",
      ],
    },
    weightPreset: {
      control: "select",
      options: ["light", "normal", "bold"],
    },
  },
  args: {
    weightPreset: "normal",
    children: "Typography",
  },
} as Meta<typeof Typography>;

type Story = StoryObj<typeof Typography>;

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

export const Headings: Story = {
  args: {
    variant: "h1",
    children: "Heading",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      },
    },
  },
};
