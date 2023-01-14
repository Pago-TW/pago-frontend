import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Heading } from "./Heading";

export default {
  title: "UI/Typography",
  component: Heading,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/dinIbshcxJCt2c1jtN1Gm6/Pago---UI-Kit?node-id=0%3A1&t=4QlV7gnKJWSXxMlM-1",
    },
  },
  argTypes: {
    variant: {
      defaultValue: "h1",
    },
    weightPreset: {
      defaultValue: "normal",
    },
    children: {
      defaultValue: "Heading",
    },
  },
} as ComponentMeta<typeof Heading>;

type Story = ComponentStoryObj<typeof Heading>;

export const Headings: Story = {};
