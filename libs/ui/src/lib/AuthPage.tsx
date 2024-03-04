import { Box, Container, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function AuthPage({
  children,
  altMessage,
  btnMessage,
  btnLink,
}: {
  children: React.ReactNode;
  altMessage: string;
  btnMessage: string;
  btnLink: string;
}) {
  return (
    <div className="bg-gradient-to-r from-white to-primary-light min-h-screen flex flex-col">
      <div className="mr-12 ml-12 pt-10 flex-shrink-0">
        <nav className="flex justify-between items-center">
          <ul>Logo</ul>
          <ul className="flex justify-center items-center">
            <p className="text-sm mr-10 text-black">{altMessage}</p>
            <Link as={NextLink} href={btnLink}>
              <Button
                bg="primary.200"
                size="sm"
                variant="solid"
                boxShadow="md"
                _hover={{ color: 'black', backgroundColor: 'primary.300' }}
              >
                {btnMessage}
              </Button>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex-grow relative overflow-auto flex items-center justify-center">
        <Flex maxW="600px" align="center" justify="center" w="full">
          <Container
            bg="white"
            boxShadow={'md'}
            borderRadius={'md'}
            maxW="600px"
            centerContent
          >
            <Box paddingTop="40px" paddingBottom="40px">
              {children}
            </Box>
          </Container>
        </Flex>
      </div>
    </div>
  );
}