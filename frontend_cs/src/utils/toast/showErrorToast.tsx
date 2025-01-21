import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();
  const showErrorToast = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };
  return showErrorToast;
};