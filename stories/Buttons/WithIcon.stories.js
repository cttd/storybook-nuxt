import { fn } from "@storybook/test";
import WithIcon from "./WithIcon.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  // title: 'Example/Button',
  component: WithIcon,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xsmall", "small", "medium", "large"],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export const IconRight = {
  args: {
    icon: "right_small",
  },
};
