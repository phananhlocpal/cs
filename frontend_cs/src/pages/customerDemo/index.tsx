import { Box } from "@chakra-ui/react";
import { ChatComponent } from "./components/chat.component";

export const CustomerDemoPage = () => {
    return (
        <Box position="relative" minH="100vh">
            <h1>Welcome to our page</h1>
            
            {/* Chat Component */}
            <ChatComponent />
        </Box>
    );
};