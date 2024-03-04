import { ChangeEvent } from 'react';
import {
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  FormErrorMessage
} from '@chakra-ui/react';


interface FormTextInputProps {
  placeholder: string;
  label: string;
  error: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  isRequired: boolean;
}

const FormTextInput: React.FC<FormTextInputProps> = (
  props: FormTextInputProps
) => {
    return (
      <FormControl isRequired={props.isRequired} isInvalid={props.isError}>
        <FormLabel>
          {props.label}
        </FormLabel>
        <InputGroup>
          <Input
            type='text'
            variant='filled'
            placeholder={props.placeholder}
            onChange={props.handleChange}
          />
        </InputGroup>
        {props.isError && (
          <FormErrorMessage size="sm">{props.error}</FormErrorMessage>
        )}
      </FormControl>)
  }

export { FormTextInput };
