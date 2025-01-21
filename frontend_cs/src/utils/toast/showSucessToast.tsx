import { useToast } from "@chakra-ui/react";

export const showSuccessToast = (message: string) => {
    const toast = useToast();
    toast({
        title: message,
        status: 'success',
        duration: 3000,
    });
};