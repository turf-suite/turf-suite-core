import {
  Button,
  Center,
  Flex,
  Stack,
  Link,
  Text,
  FormLabel,
  FormControl,
  FormHelperText,
  InputRightElement,
  InputGroup,
  Input,
} from '@chakra-ui/react';

export default function Page() {
  return (
    <Stack direction={'column'} gap="20px">
      <Flex flexDirection={'column'}>
        <Text fontWeight={'bold'} fontSize="3xl">
          Welcome!
        </Text>
        <Text fontSize="sm">
          Start your 30-day free trial. No credit card required.
        </Text>
      </Flex>
      <Stack direction="column" gap="10px">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input
              type="email"
              variant="filled"
              placeholder="john-doe@turf.com"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input type="password" variant="filled" placeholder="dxc4ya1#k" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input type="password" variant="filled" placeholder="dxc4ya1#k" />
          </InputGroup>
        </FormControl>
      </Stack>
      <Stack direction={'column'} gap="10px">
        <Button colorScheme="purple" variant="solid">
          Continue
        </Button>
        <Flex flexDirection={'row'} gap="10px" width="full">
          <Button className="flex-1" colorScheme="purple" variant="outline">
            Sign up with Google
          </Button>
          <Button className="flex-1" colorScheme="purple" variant="outline">
            Sign up with Slack
          </Button>
        </Flex>
      </Stack>
      <Flex flexDirection={'column'} align={'center'}>
        <Text>By continuing, you agree to our</Text>
        <Text>
          <span>
            <Link color="purple" href={'/'}>
              Privacy Policy
            </Link>
          </span>{' '}
          and{' '}
          <span>
            <Link color="purple" href={'/'}>
              Terms of Service
            </Link>
          </span>
        </Text>
      </Flex>
    </Stack>
  );
}
