import {
  Flex,
  Center,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { PetContext } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import BackButton from "../components/BackButton";

const PetList = () => {
  const { pets } = useContext(PetContext);
  const isMedium = useBreakpointValue({ base: false, sm: true });
  const isLarge = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
  });
  const isExtraLarge = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
  });
  const navigate = useNavigate();

  return (
    <>
      <BackButton />
      <Center
        mb={10}
        mt={{
          base: 10,
          md: 0,
        }}
      >
        <Flex flexDir="column" align="center" justify="center">
          <Heading
            textAlign="center"
            size={{
              base: "lg",
              md: "xl",
            }}
          >
            {pets.length} Pets
          </Heading>
          <Text textAlign="center" fontSize="md" mt={2} mx={5}>
            Click on a pet to view and change their details
          </Text>
          <Flex layerStyle="formFlex" mt={5} border="none" width="100%">
            <TableContainer>
              <Table variant="simple">
                <Thead bg="gray.200">
                  <Tr>
                    <Th>Name</Th>
                    <Th>Type</Th>
                    {isMedium && <Th>Breed</Th>}
                    {isLarge && (
                      <>
                        <Th>Height</Th>
                        <Th>Weight</Th>
                      </>
                    )}
                    {isExtraLarge && (
                      <>
                        <Th>Color</Th>
                        <Th>Hypoallergenic</Th>
                      </>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {pets.map((pet) => (
                    <Tr
                      key={pet.id}
                      onClick={() => navigate(`/admin/pets/${pet.id}`)}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                    >
                      <Td>{pet.name}</Td>
                      <Td>{pet.type}</Td>
                      {isMedium && <Td>{pet.breed}</Td>}
                      {isLarge && (
                        <>
                          <Td>{pet.height}</Td>
                          <Td>{pet.weight}</Td>
                        </>
                      )}
                      {isExtraLarge && (
                        <>
                          <Td>{pet.color}</Td>
                          <Td>{pet.hypoallergenic ? "Yes" : "No"}</Td>
                        </>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default PetList;
