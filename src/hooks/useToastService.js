import { useBreakpointValue, useToast } from "@chakra-ui/react";

const useToastService = () => {
  const toast = useToast();

  const position = useBreakpointValue({
    sm: "top",
    // md: "top",
    // lg: "bottom-right",
    base: "top",
  });

  const displayToast = (status, description) => {
    toast({
      position: position,
      description,
      status,
      duration: 2500,
      isClosable: true,
    });
  };

  return { displayToast };
};

export default useToastService;
