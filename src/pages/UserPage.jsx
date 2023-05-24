import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PetContext } from "../context/PetContext";
import { useContext } from "react";
import {
  Flex,
  Center,
  Heading,
  Text,
  Table,
  Button,
  Box,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import BackButton from "../components/BackButton";

const UserPage = () => {
  const { userId } = useParams();
  const { users } = useContext(AuthContext);
  const { pets } = useContext(PetContext);
  const navigate = useNavigate();

  const user = users && users.find((user) => user.id === userId);

  const userWithPets = user &&
    pets && {
      ...user,
      adoptedPets: pets.filter((pet) => pet.adoptedBy === user.id),
      fosteredPets: pets.filter((pet) => pet.fosteredBy === user.id),
    };

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

  console.log(userWithPets);

  return (
    <>
      <BackButton />
      <Center layerStyle="formCenter">
        <Flex
          flexDir="column"
          align={{
            base: "center",
            sm: "flex-start",
          }}
          justify="center"
        >
          <Flex align="flex-start" justify="center">
            <Avatar
              alt="pet"
              size={{
                base: "xl",
                md: "2xl",
              }}
              mr={5}
            />
            <Flex flexDir="column" align="flex-start" justify="center">
              <Heading
                textAlign="left"
                size={{
                  base: "lg",
                  md: "xl",
                }}
                overflowWrap="anywhere"

                // fontWeight={800}
              >
                {userWithPets?.name}
              </Heading>
              <Text overflowWrap="anywhere">{userWithPets.email}</Text>
              <Text overflowWrap="anywhere">{userWithPets.number}</Text>
              <Text overflowWrap="anywhere">
                {userWithPets.isAdmin ? "Admin" : "User"}
              </Text>
            </Flex>
          </Flex>
          {userWithPets && (
            <>
              <Flex
                mt={10}
                gap={1}
                flexDir={{
                  base: "column",
                  xs: "column",
                  sm: "row",
                }}
                w="100%"
              >
                <Tabs
                  isFitted
                  w={{
                    base: 300,
                    md: 400,
                  }}
                  variant="enclosed-colored"
                >
                  <TabList>
                    <Tab _selected={{ color: "white", bg: "blue.500" }}>
                      Fostered
                    </Tab>
                    <Tab _selected={{ color: "white", bg: "blue.500" }}>
                      Adopted
                    </Tab>
                  </TabList>
                  <TabPanels mt={5}>
                    <TabPanel>
                      <Flex justify="center" align="center">
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
                            {userWithPets.fosteredPets.map((pet) => (
                              <Tr
                                key={pet.id}
                                onClick={() => navigate(`/pets/${pet.id}`)}
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
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <Flex justify="center" align="center">
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
                            {userWithPets.adoptedPets.map((pet) => (
                              <Tr
                                key={pet.id}
                                onClick={() => navigate(`/pets/${pet.id}`)}
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
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>

                {/* <TableContainer>
                  <Table variant="simple">
                    <Thead bg="gray.200">
                      <Tr>
                        <Th>Fostered pets</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userWithPets.fosteredPets.map((pet) => (
                        <Tr
                          key={pet.id}
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() => navigate(`/pets/${pet.id}`)}
                        >
                          <Td>
                            <Flex align="center" justify="flex-start">
                              <Avatar size="md" src={pet.picture} mr={3} />
                              {pet.name}
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table variant="simple">
                    <Thead bg="gray.200">
                      <Tr>
                        <Th>Adopted pets</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {userWithPets.adoptedPets.map((pet) => (
                        <Tr
                          key={pet.id}
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() => navigate(`/pets/${pet.id}`)}
                        >
                          <Td>
                            {" "}
                            <Flex align="center" justify="flex-start">
                              <Avatar size="md" src={pet.picture} mr={3} />
                              {pet.name}
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer> */}
              </Flex>
            </>
          )}
        </Flex>
      </Center>
    </>
  );
};

export default UserPage;
