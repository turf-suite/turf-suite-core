import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Text,
  ModalCloseButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Avatar,
  Wrap,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import React from 'react';

export interface TaskViewProps {
  taskId: string;
  name: string;
  description: string;
  isOpen: boolean;
  status: string;
  assigneeName: string;
  reviewerName: string;
  tags: Array<string>;
  startDate?: Date;
  dueDate: Date;
  onClose: () => void;
}

const TaskView: React.FC<TaskViewProps> = (props: TaskViewProps) => {
  const formatDate = (date?: Date) =>
    date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid rowGap={'16px'} w={'100%'} templateColumns={'repeat(4, 1fr)'}>
            <GridItem colSpan={1}>
              <Text fontSize={'xs'} opacity={'0.8'} fontWeight={'500'}>
                Description
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                {props.description}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text opacity={'0.8'} fontSize={'xs'}>
                Status
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Tag size={'sm'} fontWeight={'bold'}>
                <TagLabel>{props.status}</TagLabel>
              </Tag>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={'xs'} opacity={'0.8'}>
                Assigned to
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Tag size={'sm'} fontWeight={'bold'}>
                <TagLeftIcon as={Avatar} />
                <TagLabel>{props.assigneeName}</TagLabel>
              </Tag>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={'xs'} opacity={'0.8'}>
                Start date
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                {formatDate(props.startDate)}
              </Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text fontSize={'xs'} opacity={'0.8'}>
                Due date
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontSize={'xs'} fontWeight={'bold'}>
                {formatDate(props.dueDate)}
              </Text>
            </GridItem>
            <GridItem colSpan={1} opacity={'0.8'}>
              <Text fontSize={'xs'}>Accepted by</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Tag size={'sm'} fontWeight={'bold'}>
                <TagLeftIcon as={Avatar} />
                <TagLabel>{props.reviewerName}</TagLabel>
              </Tag>
            </GridItem>
            <GridItem colSpan={1} opacity={'0.8'}>
              <Text fontSize={'xs'}>Priority</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Tag size={'sm'} fontWeight={'bold'}>
                <TagLabel>Low</TagLabel>
              </Tag>
            </GridItem>
            <GridItem colSpan={1} opacity={'0.8'}>
              <Text fontSize={'xs'}>Tags</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Wrap>
                {props.tags.map((tag) => (
                  <Tag size={'sm'} variant={'solid'} fontWeight={'bold'}>
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                ))}
              </Wrap>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskView;
