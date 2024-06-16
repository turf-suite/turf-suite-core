import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Text,
  ModalCloseButton,
  Table,
  Tbody,
  Tr,
  Tag,
  TagLabel,
  Td,
  TagLeftIcon,
  Avatar,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';

export interface TaskViewProps {
  taskId: string;
  name: string;
  description: string;
  isOpen: boolean;
  status: string;
  assigneeName: string;
  tags: Array<string>;
  onClose: () => void;
}

const TaskView: React.FC<TaskViewProps> = (props: TaskViewProps) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{props.description}</Text>
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight="100" fontSize={'xs'}>
                    Status
                  </Text>
                </Td>
                <Td>
                  <Tag size={'sm'}>
                    <TagLabel>{props.status}</TagLabel>
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontSize={'xs'}>Assigned to</Text>
                </Td>
                <Td>
                  <Tag size={'sm'}>
                    <TagLeftIcon as={Avatar} />
                    <TagLabel>{props.assigneeName}</TagLabel>
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontSize={'xs'}>Priority</Text>
                </Td>
                <Td>
                  <Tag size={'sm'}>
                    <TagLabel>Low</TagLabel>
                  </Tag>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontSize={'xs'}>Tags</Text>
                </Td>
                <Td>
                  <Wrap>
                    {props.tags.map((tag) => (
                      <Tag size={'sm'}>
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    ))}
                  </Wrap>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskView;
