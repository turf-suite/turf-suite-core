import React from 'react';
import {
  Text,
  Avatar,
  Flex,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverCloseButton,
} from '@chakra-ui/react';

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
    <PopoverContent>
      <PopoverHeader fontWeight="bold">{`${props.taskId} - Comments`}</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        <Flex direction="column">
          {props.comments.length > 0 ? (
            props.comments.map((comment) => (
              <TaskComment
                message={comment.message}
                authorAvatarUrl={comment.authorAvatarUrl}
                isUserComment={comment.isUserComment}
              />
            ))
          ) : (
            <Text>Nothing Here Yet!</Text>
          )}
        </Flex>
      </PopoverBody>
    </PopoverContent>
  );
};

export default TaskCommentsList;
