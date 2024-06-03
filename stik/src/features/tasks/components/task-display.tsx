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
  list,
} from '@chakra-ui/react';
import {
  EditIcon,
  CalendarIcon,
  LinkIcon,
  AttachmentIcon,
  DragHandleIcon,
} from '@chakra-ui/icons';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

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

const Task: React.FC<TaskDisplayProps> = (props: TaskDisplayProps) => {
  const { setNodeRef, attributes, listeners, isDragging, transform } =
    useDraggable({
      id: props.id,
    });
  return (
    <Box
      ref={setNodeRef}
      maxWidth="275px"
      bg="white"
      padding="15px"
      zIndex={isDragging ? '100' : 'auto'}
      opacity={isDragging ? 0.3 : 1}
      borderRadius="4px"
      transform={CSS.Translate.toString(transform)}
    >
      <Flex width="100%" direction="column" gap="8px" align="center">
        <IconButton
          {...attributes}
          {...listeners}
          size="md"
          variant="ghost"
          aria-label="Drag Task"
          icon={<DragHandleIcon sx={{ transform: 'rotate(90deg)' }} />}
        />
        <Flex
          flex="1"
          align={'start'}
          flexDirection="column"
          gap="24px"
          grow={0}
        >
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
          <Flex width="100%" direction="column" gap="12px">
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
                  ? Math.round(
                    (props.hoursCompleted / props.hoursEstimated) * 100
                  )
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
      </Flex>
    </Box>
  );
};
export default Task;
