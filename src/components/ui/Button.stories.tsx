import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "./Button";

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
