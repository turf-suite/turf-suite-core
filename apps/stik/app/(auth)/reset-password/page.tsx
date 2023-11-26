'use client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  FormLabel,
  FormControl,
  FormHelperText,
  InputRightElement,
  Link,
  InputGroup,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../../providers';
import AuthPage from '../../components/authPage';

export default function Page() {
  const supabase = useSupabase();
  const [responded, setResponded] = useState(false);
  const [email, setEmail] = useState('');
  const handleClick = async () => {
    return;
  };

  return (
    <AuthPage altMessage="No account?" btnMessage="Sign up">
      <Stack direction="column" gap="20px">
        <Text fontSize="3xl" fontWeight={'Bold'}>
          Reset Your Password
        </Text>
        <Text fontSize="sm">
          An email will be sent if an account exists with it
        </Text>
        <InputGroup size="lg">
          <Input pr="4.5rem" type="text" placeholder="Enter Email" />
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={handleClick}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
    </AuthPage>
  );
}
