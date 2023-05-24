import { Button, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {!isMobile && (
        <Button
          variant="outline"
          leftIcon={<ChevronLeftIcon />}
          onClick={() => navigate(-1)}
          ml={{
            sm: 5,
            md: 100,
            base: 5,
          }}
          mt={5}
          size="sm"
        >
          Back
        </Button>
      )}
    </>
  );
};

export default BackButton;
