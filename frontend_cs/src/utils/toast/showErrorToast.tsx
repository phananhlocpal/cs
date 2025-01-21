import { useToast } from "@chakra-ui/react";

export const showErrorToast = (message: string) => {
    var toast = useToast();
    toast({
      title: message,
      status: 'error',
      duration: 3000,
    });
  };