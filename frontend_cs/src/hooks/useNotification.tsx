import { useToast } from "@chakra-ui/react";

export const useNotification = () => {
    const toast = useToast();
    const showNotification = (message: string, status: 'info' | 'warning' | 'success' | 'error') => {
        toast({
        title: message,
        status,
        duration: 3000,
        isClosable: true,
        });
    };
    return showNotification;
}