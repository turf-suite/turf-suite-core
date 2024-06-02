import React from 'react';
import {
  Box,
  Progress,
  VStack,
  Tag,
  TagLabel,
  Text,
  Avatar,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

interface TaskDisplayProps {
  name: string;
  id: string;
  assigneeUrl: string;
  startDate: Date | undefined;
  dueDate: Date;
  hoursCompleted: number;
  hoursEstimated: number;
}

const prettyDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const Task: React.FC<TaskDisplayProps> = (props: TaskDisplayProps) => (
  <Box>
    <VStack spacing="24px">
      <Spacer>
        <Tag size="sm" variant="subtle">
          {props.startDate !== undefined ? (
            <TagLabel>{`${prettyDate(props.startDate)} - ${prettyDate(
              props.dueDate
            )}`}</TagLabel>
          ) : (
            <TagLabel>{prettyDate(props.dueDate)}</TagLabel>
          )}
        </Tag>
        <IconButton aria-label="Edit Task" icon={<EditIcon />} />
      </Spacer>
      <VStack spacing="12px">
        <Text variant="md">{props.id}</Text>
        <Text variant="sm">{props.name}</Text>
        <Avatar src={props.assigneeUrl} />
      </VStack>
      <VStack spacing="12px">
        <Progress
          size="sm"
          value={
            props.hoursCompleted > 0
              ? Math.round((props.hoursCompleted / props.hoursEstimated) * 100)
              : 0
          }
        />
        <Text variant="sm">
          {props.hoursCompleted > 0
            ? `${Math.round(
              (props.hoursCompleted / props.hoursEstimated) * 100
            )}%`
            : '0%'}
        </Text>
      </VStack>
    </VStack>
  </Box>
);
export default Task;
