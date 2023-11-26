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
  InputGroup,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import AuthPage from "../../components/authPage";
import { useState, ChangeEvent } from 'react';
import { useSupabase } from '../../providers';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const supabase = useSupabase();
  const router = useRouter();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const emailErr =
    email != '' && !emailRegex.test(email) ? 'Please enter a valid email.' : '';
  const passwordErr =
    password != '' && password.length < 8
      ? 'Please enter a password of at least 8 characters'
      : '';
  const handleSubmit = async () => {
    if (emailErr || passwordErr) {
      return;
    }
    setIsLoading(true);
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) {
      setAuthError(res.error.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push('/');
  };

  return (
    <AuthPage altMessage="New with us?" btnMessage="Start for free">
      <Stack direction={'column'} gap="20px">
        <Flex flexDirection={'column'}>
          {authError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <Text fontWeight={'bold'} fontSize="3xl">
            Howdy!
          </Text>
        </Flex>
        <Stack direction="column" gap="10px">
          <FormControl isRequired isInvalid={emailErr.length > 0}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <Input
                type="email"
                variant="filled"
                placeholder="john-doe@turf.com"
                onChange={handleEmailChange}
              />
            </InputGroup>
            {emailErr && (
              <FormErrorMessage size="sm">{emailErr}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={passwordErr.length > 0}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type="password"
                variant="filled"
                placeholder="dxc4ya1#k"
                onChange={handlePasswordChange}
              />
            </InputGroup>
            {passwordErr && (
              <FormErrorMessage size="sm">{passwordErr}</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <Stack direction={'column'} gap="10px">
          <Button
            isLoading={isLoading}
            loadingText="Processing"
            colorScheme="purple"
            onClick={handleSubmit}
            variant="solid"
          >
            Sign in
          </Button>
          <Flex flexDirection={'row'} gap="10px" width="full">
            <Button className="flex-1" colorScheme="purple" variant="outline">
              Sign in with Google
            </Button>
            <Button className="flex-1" colorScheme="purple" variant="outline">
              Sign in with Slack
            </Button>
          </Flex>
        </Stack>
        <Flex flexDirection={'column'} align={'center'}>
          <Button variant="text">Forgot your password?</Button>
        </Flex>
      </Stack>
    </AuthPage>
  )
}
