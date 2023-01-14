import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Heading } from "./Heading";

export default {
  title: "UI/Typography",
  component: Heading,
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
