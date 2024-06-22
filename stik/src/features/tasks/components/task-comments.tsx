import React from 'react';
import {
  Text,
  Avatar,
  Flex,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  InputLeftElement,
  Center,
} from '@chakra-ui/react';
import { AtSignIcon, ChevronRightIcon } from '@chakra-ui/icons';

export interface TaskCommentsProps {
  message: string;
  authorAvatarUrl: string;
  isUserComment: boolean;
}

export interface TaskCommentsListProps {
  comments: Array<TaskCommentsProps>;
  taskId: string;
}

const TaskComment: React.FC<TaskCommentsProps> = (props: TaskCommentsProps) => {
  return (
    <Flex>
      <Avatar src={props.authorAvatarUrl} />
      <Text flex={'1'}>{props.message}</Text>
    </Flex>
  );
};

const TaskCommentsList: React.FC<TaskCommentsListProps> = (
  props: TaskCommentsListProps
) => {
  return (
    <PopoverContent boxSize="lg" bgColor="primary.50">
      <PopoverHeader fontWeight="bold">{`${props.taskId} - Comments`}</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody height="100%">
        <Flex direction="column" height="100%">
          <Flex height="100%" flex="1" overflowY={'auto'} direction="column">
            {props.comments.length > 0 ? (
              props.comments.map((comment) => (
                <TaskComment
                  message={comment.message}
                  authorAvatarUrl={comment.authorAvatarUrl}
                  isUserComment={comment.isUserComment}
                />
              ))
            ) : (
              <Center flex="1">
                <Text opacity="0.8" fontSize="lg">
                  Get the conversation started...
                </Text>
              </Center>
            )}
          </Flex>
          <FormControl>
            <InputGroup>
              <InputLeftElement>
                <IconButton
                  variant="ghost"
                  aria-label="Add Emoji"
                  icon={<AtSignIcon />}
                />
              </InputLeftElement>
              <Input
                type="text"
                variant="outline"
                placeholder="Add your comment..."
              />
              <InputRightElement>
                <IconButton
                  aria-label="Send Comment"
                  variant="ghost"
                  icon={<ChevronRightIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};

export default TaskCommentsList;
