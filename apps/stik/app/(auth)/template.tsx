import { Center, Box, Button, Flex } from '@chakra-ui/react';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-white to-primary-light h-screen flex flex-col">
      <div className="mr-12 ml-12 pt-10">
        <nav className="flex justify-between items-center">
          <ul>Logo</ul>
          <ul className="flex justify-center items-center">
            <p className="text-sm mr-10 text-black">Already have an account?</p>
            <Button colorScheme="purple" size="sm" variant="solid">
              Sign in
            </Button>
          </ul>
        </nav>
      </div>
      <div className="flex-grow relative">
        <Flex align="center" justify="center" h="full">
          <Box bg="white" boxShadow={'md'} borderRadius={'md'} width={'600px'}>
            <Center marginTop="40px" marginBottom="40px">
              {children}
            </Center>
          </Box>
        </Flex>
      </div>
    </div>
  );
}
