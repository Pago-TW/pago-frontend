import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=48%3A126&t=oa1ENLEM9s30o6TL-1",
    },
  },
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
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
} as ComponentMeta<typeof Checkbox>;

type Story = ComponentStoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};
