import React from 'react';
import {
  Box,
  Progress,
  Flex,
  ButtonGroup,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  Avatar,
  Spacer,
  IconButton,
  Popover,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import {
  EditIcon,
  CalendarIcon,
  LinkIcon,
  ChatIcon,
  DragHandleIcon,
} from '@chakra-ui/icons';
import TaskCommentsList from './task-comments';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskView from './task-view';

interface TaskProps {
  name: string;
  id: string;
  assigneeUrl: string;
  assigneeName: string;
  description: string;
  status: string;
  startDate: Date | undefined;
  dueDate: Date;
  hoursCompleted: number;
  hoursEstimated: number;
  tags: Array<string>;
}

const prettyDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const Task: React.FC<TaskProps> = (props: TaskProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: props.id,
  });
  const { onToggle, onClose, isOpen } = useDisclosure();
  const taskModal = useDisclosure();
  const reviewerName = 'Guuss Ketelings';

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="auto"
      closeOnBlur={false}
    >
      <Box
        ref={setNodeRef}
        maxWidth="300px"
        bg="white"
        padding="15px"
        zIndex={isDragging ? '100' : 'auto'}
        opacity={isDragging ? 0.3 : 1}
        borderRadius="4px"
        transform={CSS.Translate.toString(transform)}
        style={{ transition, boxShadow: '0px 0px 8px 0px rgba(26,29,31,0.5)' }}
      >
        <PopoverTrigger>
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
                <button
                  aria-label="Open Task"
                  onClick={taskModal.onOpen}
                  style={{ textAlign: 'start' }}
                >
                  <Text fontSize="md" fontWeight="bold" marginBottom={'4px'}>
                    {props.id}
                  </Text>
                  <Text fontSize="sm">{props.name}</Text>
                </button>
                <Flex width="100%">
                  <Avatar src={props.assigneeUrl} size="xs" />
                  <Spacer />
                  <ButtonGroup>
                    <IconButton
                      size="sm"
                      variant="solid"
                      aria-label="Linked Tasks"
                      icon={<LinkIcon />}
                    />
                    <IconButton
                      variant="solid"
                      size="sm"
                      aria-label="Task Comments"
                      icon={<ChatIcon />}
                      onClick={onToggle}
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
        </PopoverTrigger>
        <TaskCommentsList comments={[]} taskId={props.id} />
        <TaskView
          name={props.name}
          taskId={props.id}
          description={props.description}
          startDate={props.startDate}
          dueDate={props.dueDate}
          onClose={taskModal.onClose}
          isOpen={taskModal.isOpen}
          status={props.status}
          tags={props.tags}
          assigneeName={props.assigneeName}
          reviewerName={reviewerName}
        />
      </Box>
    </Popover>
  );
};
export default Task;
