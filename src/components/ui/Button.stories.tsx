import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/Button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=275%3A4458&t=8uU11S9YqZI3Y0Qs-1",
    },
  },
  argTypes: {
    children: {
      type: "string",
    },
  },
  args: {
    size: "small",
    variant: "contained",
    loading: false,
    disabled: false,
    children: "Button",
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};
