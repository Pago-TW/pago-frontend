import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
      defaultValue: "small",
    },
  },
} as ComponentMeta<typeof Checkbox>;

type Story = ComponentStoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};
