import { useState } from "react";
import { Box, Button, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { ChatComponent } from "./components/chat.component";

export const PublicPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    setIsRegistering(false);
    setIsLoggedIn(true);
  };

  return (
    <Box position="relative" minH="100vh" bg="gray.50">
      <Box bg="blue.500" color="white" p={4}>
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">E-Commerce Store</Heading>
          {isLoggedIn ? (
            <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button colorScheme="blue" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Login" : "Register"}
            </Button>
          )}
        </Flex>
      </Box>

      <Box p={4}>
        <Heading as="h2" size="md" mb={4}>Welcome to our page</Heading>
        {isLoggedIn ? (
          <ChatComponent />
        ) : (
          <Stack spacing={4} maxW="md" mx="auto">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isRegistering ? (
              <Button colorScheme="blue" onClick={handleRegister}>Register</Button>
            ) : (
              <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
            )}
          </Stack>
        )}
      </Box>

      <Box bg="blue.500" color="white" p={4} mt="auto">
        <Text textAlign="center">&copy; 2023 E-Commerce Store. All rights reserved.</Text>
      </Box>
      <ChatComponent />
    </Box>
  );
};