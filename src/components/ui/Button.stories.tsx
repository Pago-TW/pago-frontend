import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
      defaultValue: "small",
    },
    variant: {
      control: {
        type: "radio",
        options: ["text", "outlined", "contained"],
      },
      defaultValue: "contained",
    },
    children: {
      control: {
        type: "text",
      },
      defaultValue: "Button",
    },
  },
} as ComponentMeta<typeof Button>;

type Story = ComponentStoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};
