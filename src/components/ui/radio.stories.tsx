import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "@/components/ui/radio";

export default {
  title: "UI/Radio",
  component: Radio,
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
} as Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {},
};
