import type { Meta, StoryObj } from '@storybook/react';

import Task from './task-display';

const meta: Meta<typeof Task> = {
  component: Task,
};

export default meta;
type Story = StoryObj<typeof Task>;

export const Display: Story = {
  args: {
    id: 'TURF-01',
    name: 'Create new tasks and be able to change their state on the boards',
    assigneeUrl: '',
    startDate: new Date(2023, 0, 1),
    dueDate: new Date(2023, 0, 14),
    hoursCompleted: 1,
    hoursEstimated: 15,
  },
};
