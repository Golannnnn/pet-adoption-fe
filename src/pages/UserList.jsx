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
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import BackButton from "../components/BackButton";

const UserList = () => {
  const { users } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMedium = useBreakpointValue({ base: false, sm: true });
  const isLarge = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
  });

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
            {users.length} Users
          </Heading>
          <Text textAlign="center" fontSize="md" mt={2} mx={5}>
            Click on a user to view their fostered and adopted pets
          </Text>
          <Flex layerStyle="formFlex" mt={5} border="none" width="100%">
            <TableContainer>
              <Table variant="simple">
                <Thead bg="gray.200">
                  <Tr>
                    <Th>Name</Th>
                    {isMedium && <Th>Email</Th>}
                    {isLarge && (
                      <>
                        <Th>Phone Number</Th>
                        <Th>Role</Th>
                      </>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr
                      key={user.id}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      <Td>{user.name}</Td>
                      {isMedium && <Td>{user.email}</Td>}
                      {isLarge && (
                        <>
                          <Td>{user.number}</Td>
                          <Td>{user.isAdmin ? "Admin" : "User"}</Td>
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

export default UserList;
