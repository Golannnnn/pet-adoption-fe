import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from "@chakra-ui/react";

const MyAlert = ({ name, status, onClose }) => {
  return (
    <Alert status={status === "available" ? "info" : "success"}>
      <AlertIcon />
      <Box>
        <AlertTitle>
          {status === "available" ? "Returned" : "Congratulations!"}
        </AlertTitle>
        <AlertDescription>
          {status === "available"
            ? `You have returned ${name}. We will take good care of them until they find a new home.`
            : `You are now ${
                status === "fostered" ? "fostering" : "adopting"
              } ${name}. Enjoy your time together!`}
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
};

export default MyAlert;
