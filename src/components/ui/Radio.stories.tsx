import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Radio } from "./Radio";

export default {
  title: "UI/Radio",
  component: Radio,
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
