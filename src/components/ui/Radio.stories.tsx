import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Radio } from "./Radio";

export default {
  title: "UI/Radio",
  component: Radio,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium"],
      },
      defaultValue: "small",
    },
    disabled: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Radio>;

type Story = ComponentStoryObj<typeof Radio>;

export const Default: Story = {
  args: {},
};
