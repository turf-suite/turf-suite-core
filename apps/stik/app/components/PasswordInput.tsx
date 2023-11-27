'use client';

import { useState, ChangeEvent } from 'react';
import {
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface PasswordInputProps {
  placeholder: string;
  label: string;
  error: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = (
  props: PasswordInputProps
) => {
  const [show, setShow] = useState(false);
  const handleShowClick = () => setShow(!show);

  return (
    <FormControl isRequired isInvalid={props.isError}>
      <FormLabel>{props.label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          variant="filled"
          placeholder={props.placeholder}
          onChange={props.handleChange}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="view"
            size="sm"
            onClick={handleShowClick}
            icon={show ? <ViewOffIcon /> : <ViewIcon />}
          />
        </InputRightElement>
      </InputGroup>
      {props.isError && (
        <FormErrorMessage size="sm">{props.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default PasswordInput;
