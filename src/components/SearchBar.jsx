import {
  Flex,
  Select,
  Input,
  Button,
  Text,
  Switch,
  Collapse,
  useDisclosure,
  Tooltip,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ handleInputText, handleSearchSubmit, loading }) => {
  console.log("rendering SearchBar");

  const { isOpen, onToggle } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  // FaSearch

  return (
    <>
      <Flex align="center" justify="center">
        {!isMobile && (
          <Select
            name="type"
            size="md"
            w="180px"
            mr={2}
            onChange={handleInputText}
          >
            <option selected hidden disabled value="">
              Type
            </option>

            <option value="any">Any</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
          </Select>
        )}
        <Input
          type="text"
          name="name"
          placeholder="Search"
          mr={2}
          minW={10}
          onChange={handleInputText}
        />
        <Button
          type="submit"
          style={{
            width: "120px",
          }}
          size="md"
          onClick={handleSearchSubmit}
          isLoading={loading}
        >
          Search
        </Button>
      </Flex>
      <Flex mt={5} flexDir="column" align="center" justify="center">
        <Flex justify="center" align="center">
          <Text fontWeight={500}>Advanced Filters</Text>
          <Switch ml={2} colorScheme="teal" size="lg" onChange={onToggle} />
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Flex layerStyle="searchCollapse">
            {isMobile && (
              <Flex layerStyle="searchColumn">
                <Text mb={1} fontSize={15} ml={1}>
                  Type
                </Text>
                <Select name="type" size="md" onChange={handleInputText}>
                  <option selected hidden disabled value="">
                    Type
                  </option>

                  <option value="any">Any</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                </Select>
              </Flex>
            )}

            <Flex layerStyle="searchColumn">
              <Text mb={1} fontSize={15} ml={1}>
                Status
              </Text>
              <Select name="status" size="md" onChange={handleInputText}>
                <option value="any">Any</option>
                <option value="available">Available</option>
                <option value="fostered">Fostered</option>
                <option value="adopted">Adopted</option>
              </Select>
            </Flex>

            <Flex layerStyle="searchColumn">
              <Text mb={1} fontSize={15} ml={1}>
                Size
              </Text>
              <Select name="size" size="md" onChange={handleInputText}>
                <option value="any">Any</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </Select>
            </Flex>
            <Flex layerStyle="searchColumn">
              <Tooltip
                hasArrow
                label={
                  <Stack p={2} fontSize={12}>
                    <Text fontSize={14} fontWeight="bold">
                      Examples:
                    </Text>
                    <Text>Domestic Shorthair Mix</Text>
                    <Text>Plott Hound Mix</Text>
                    <Text>Californian</Text>
                    <Text>Border Terrier</Text>
                  </Stack>
                }
                placement="top-start"
              >
                <Text mb={1} fontSize={15} ml={1}>
                  Breed
                </Text>
              </Tooltip>
              <Input
                name="breed"
                type="text"
                placeholder="Border Terrier"
                onChange={handleInputText}
              />
            </Flex>

            <Flex flexDir="column">
              <Text mb={1} fontSize={15} ml={1}>
                Color
              </Text>
              <Input
                name="color"
                type="text"
                placeholder="White"
                onChange={handleInputText}
              />
            </Flex>
          </Flex>
        </Collapse>
      </Flex>
    </>
  );
};

export default SearchBar;
