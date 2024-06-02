import React from 'react';
import {
  Box,
  Progress,
  VStack,
  Flex,
  ButtonGroup,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  Avatar,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import {
  EditIcon,
  CalendarIcon,
  LinkIcon,
  AttachmentIcon,
} from '@chakra-ui/icons';

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
  <Box maxWidth="250px" bg="primary.50">
    <Flex align={'start'} flexDirection="column" gap="24px" grow={0}>
      <Flex width="100%">
        <Tag colorScheme="primary" size="sm">
          <TagLeftIcon as={CalendarIcon} />
          {props.startDate !== undefined ? (
            <TagLabel>{`${prettyDate(props.startDate)} - ${prettyDate(
              props.dueDate
            )}`}</TagLabel>
          ) : (
            <TagLabel>{prettyDate(props.dueDate)}</TagLabel>
          )}
        </Tag>
        <Spacer />
        <ButtonGroup>
          <IconButton
            color="primary"
            size="sm"
            aria-label="Edit Task"
            icon={<EditIcon />}
          />
        </ButtonGroup>
      </Flex>
      <Flex direction="column" gap="12px">
        <Text fontSize="md" fontWeight="bold">
          {props.id}
        </Text>
        <Text fontSize="sm">{props.name}</Text>
        <Flex width="100%">
          <Avatar src={props.assigneeUrl} size="xs" />
          <Spacer />
          <ButtonGroup>
            <IconButton
              size="sm"
              variant="solid"
              aria-label="Task Attachments"
              icon={<AttachmentIcon />}
            />
            <IconButton
              variant="solid"
              size="sm"
              aria-label="Linked Tasks"
              icon={<LinkIcon />}
            />
          </ButtonGroup>
        </Flex>
      </Flex>
      <Flex direction="column" gap="12px" width="100%">
        <Progress
          size="sm"
          colorScheme="accent"
          value={
            props.hoursCompleted > 0
              ? Math.round((props.hoursCompleted / props.hoursEstimated) * 100)
              : 0
          }
        />
        <Text fontSize="xs">
          {props.hoursCompleted > 0
            ? `${Math.round(
              (props.hoursCompleted / props.hoursEstimated) * 100
            )}%`
            : '0%'}
        </Text>
      </Flex>
    </Flex>
  </Box>
);
export default Task;
