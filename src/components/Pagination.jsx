import { Flex, Button, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex mt={10} mb={5} gap={10} align="center" justify="center">
      <Button
        size="md"
        onClick={() => handlePageChange(currentPage - 1)}
        variant="ghost"
        borderRadius="full"
        isDisabled={currentPage <= 1}
      >
        <FaArrowLeft />
      </Button>

      {!isMobile &&
        pageNumbers.map((pageNumber) => (
          <Button
            size="md"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            variant="ghost"
            _hover={
              pageNumber === currentPage
                ? { bg: "rgb(156, 66, 33)", color: "white" }
                : { bg: "rgb(156, 66, 33)", color: "white" }
            }
            borderRadius="full"
            bg={pageNumber === currentPage ? "rgb(156, 66, 33)" : "none"}
            color={pageNumber === currentPage ? "white" : "black"}
          >
            {pageNumber}
          </Button>
        ))}

      <Button
        size="md"
        onClick={() => handlePageChange(currentPage + 1)}
        variant="ghost"
        borderRadius="full"
        isDisabled={currentPage >= totalPages}
      >
        <FaArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
