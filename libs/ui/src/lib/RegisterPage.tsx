import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Flex,
  Stack,
  Link,
  Text,
  FormLabel,
  FormControl,
  InputGroup,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { ChangeEvent, useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import AuthLayout from './AuthLayout';
import { useSupabase } from '@turf-suite-core/react-shared';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const supabase = useSupabase();
  const navigate = useNavigate();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);
  const emailErr =
    email !== '' && !emailRegex.test(email)
      ? 'Please enter a valid email.'
      : '';
  const passwordErr = password !== '' && password.length < 8;
  const passwordMatchErr =
    password !== confirmPassword && confirmPassword !== '';
  const handleSubmit = async () => {
    if (emailErr || passwordErr || passwordMatchErr) {
      return;
    }
    setIsLoading(true);
    const res = await supabase.auth.signUp({ email, password });
    if (res.error) {
      setAuthError(res.error.message);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    navigate('/');
  };

  return (
    <AuthLayout
      altMessage="Already have an account?"
      btnMessage="Sign in"
      btnLink="/login"
    >
      <Stack direction={'column'} gap="20px">
        <Flex flexDirection={'column'}>
          {authError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <Text fontWeight={'bold'} fontSize="3xl">
            Welcome!
          </Text>
          <Text fontSize="sm">
            Start your 30-day free trial. No credit card required.
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
          <PasswordInput
            handleChange={handlePasswordChange}
            error="Please enter a password with 8 or more chracters"
            isError={passwordErr}
            placeholder="dxc4ya1#k"
            label="Password"
          />
          <PasswordInput
            handleChange={handleConfirmPasswordChange}
            error="The entered passwords don't match"
            isError={passwordMatchErr}
            placeholder="dxc4ya1#k"
            label="Confirm Password"
          />
        </Stack>
        <Stack direction={'column'} gap="10px">
          <Button
            isLoading={isLoading}
            loadingText="Processing"
            colorScheme="accent"
            onClick={handleSubmit}
            variant="solid"
            rightIcon={<ArrowForwardIcon />}
          >
            Continue
          </Button>
          <Flex flexDirection={'row'} gap="10px" width="full">
            <Button className="flex-1" colorScheme="accent" variant="outline">
              Sign up with Google
            </Button>
            <Button className="flex-1" colorScheme="accent" variant="outline">
              Sign up with Slack
            </Button>
          </Flex>
        </Stack>
        <Flex flexDirection={'column'} align={'center'}>
          <Text>By continuing, you agree to our</Text>
          <Text>
            <span>
              <Link color="accent.700" href={'/'}>
                Privacy Policy
              </Link>
            </span>{' '}
            and{' '}
            <span>
              <Link color="accent.700" href={'/'}>
                Terms of Service
              </Link>
            </span>
          </Text>
        </Flex>
      </Stack>
    </AuthLayout>
  );
}
