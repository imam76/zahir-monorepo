import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@repo/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  args: {
    className: "storybook-card",
    href: "https://turborepo.com",
    title: "Shared package",
    children: "This card is rendered from the @repo/ui workspace package.",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
