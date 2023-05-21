import type { Meta, StoryObj } from "@storybook/react";
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
  args: {
    size: "small",
    disabled: false,
  },
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};
