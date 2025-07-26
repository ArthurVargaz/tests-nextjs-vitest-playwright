import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Forms/Button',
  component: Button,
  decorators: [
    Story => (
      <div className='max-w-screen-md mx-auto p-12 flex items-center justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Danger: Story = {
  args: {
    children: 'Texto do botão',
    variant: 'danger',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Texto do botão',
    variant: 'ghost',
    size: 'lg',
  },
};

export const Default: Story = {
  args: {
    children: 'Texto do botão',
    variant: 'default',
    size: 'lg',
  },
};
