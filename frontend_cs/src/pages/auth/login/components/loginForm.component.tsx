import { useState } from "react";
import { Flex, Heading, Input, Button, useColorModeValue, Box, Switch } from "@chakra-ui/react";
import { LoginFormProps } from "@/abstract";

export const LoginFormComponent: React.FC<LoginFormProps> = ({ onSubmitLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(true);
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmitLogin({ email, password, checked }); }}>
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
        width="100%"
        maxWidth="600px"
        mx="auto"
      >
        <Heading mb={6}>Welcome to our customer service system</Heading>
        <Box className="mb-5">Please login first to explore!</Box>
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
        <Switch isChecked={checked} onChange={(e) => setChecked(e.target.checked)} className="mb-5">Login as System User</Switch>
        <Button colorScheme="teal" mb={8} type="submit">
          Log In
        </Button>
      </Flex>
    </form>
  );
};
