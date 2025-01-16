import { useState } from "react";
import { Flex, Heading, Input, Button, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { LoginFormProps } from "@/abstract";

export const LoginFormComponent: React.FC<LoginFormProps> = ({ onSubmitLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmitLogin({ email, password }); }}>
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Welcome to our customer service system</Heading>
        <p>Please login first to explore!</p>
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          variant="outline"
          mb={3}
          required
        />
        <Input
          placeholder="**********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          variant="outline"
          mb={6}
          required
        />
        <Button colorScheme="teal" mb={8} type="submit">
          Log In
        </Button>
      </Flex>
    </form>
  );
};

LoginFormComponent.propTypes = {
  onSubmitLogin: PropTypes.func.isRequired,
};
