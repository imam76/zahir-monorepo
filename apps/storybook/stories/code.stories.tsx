import type { Meta, StoryObj } from "@storybook/react-vite";
import { Code } from "@repo/ui/code";

const meta = {
  title: "UI/Code",
  component: Code,
  args: {
    className: "storybook-code",
    children: "bun run storybook",
  },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {};
