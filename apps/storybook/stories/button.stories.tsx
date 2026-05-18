import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    appName: "storybook",
    children: "Open alert",
    className: "storybook-button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
