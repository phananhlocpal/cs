import { useToast } from "@chakra-ui/react";

export const useSucessToast = () => {
    const toast = useToast();
    const showSuccessToast = (message: string) => {
        toast({
            title: message,
            status: 'success',
            duration: 3000,
        });
    };
    return showSuccessToast;
}