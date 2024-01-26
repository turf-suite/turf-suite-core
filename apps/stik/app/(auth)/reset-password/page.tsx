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
import { useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '../../providers';
import AuthPage from '../../components/authPage';

export default function Page() {
  const supabase = useSupabase();
  const [responded, setResponded] = useState(false);
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleClick = async () => {
    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback?next=/account/update-password'`,
    });
    if (error) {
      setAuthError(error.message);
    }
  };

  return (
    <AuthPage altMessage="No account?" btnMessage="Sign up" btnLink="/register">
      <Stack direction="column" gap="20px">
        <Flex flexDirection={'column'}>
          {authError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <Text fontWeight={'bold'} fontSize="3xl">
            Reset Your Password
          </Text>
          <Text fontSize="sm">
            You will receive an email if there is an account with the entered
            email.
          </Text>
        </Flex>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Enter Email"
            onChange={handleEmailChange}
          />
          <InputRightElement width="4.5rem">
            <Button colorScheme="accent" size="sm" onClick={handleClick}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </Stack>
    </AuthPage>
  );
}
