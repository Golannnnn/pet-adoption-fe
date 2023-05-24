import { PetContext } from "../context/PetContext";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  Text,
  Heading,
  Center,
  Flex,
  Box,
  Button,
  Grid,
} from "@chakra-ui/react";
import userService from "../services/users";
import { Link } from "react-router-dom";

// create nice layout for admin dashboard with buttons to redirect to other components

const AdminDashboard = () => {
  return (
    <Box
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="xl" mt={5} mb={10}>
        Admin Dashboard
      </Heading>
      <Grid
        templateColumns="1fr"
        // templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        width="100%"
        maxWidth="450px"
      >
        <Box
          bg="white"
          borderRadius="lg"
          p={8}
          textAlign="center"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading as="h2" size="lg" mb={4}>
            Add a Pet
          </Heading>
          <Button as={Link} to="/admin/pets/add" size="lg" width="100%">
            Go to Add a Pet Page
          </Button>
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          p={8}
          textAlign="center"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading as="h2" size="lg" mb={4}>
            User List
          </Heading>
          <Button as={Link} to="/admin/users/list" size="lg" width="100%">
            Go to User List Page
          </Button>
        </Box>

        <Box
          bg="white"
          borderRadius="lg"
          p={8}
          textAlign="center"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading as="h2" size="lg" mb={4}>
            Pet List
          </Heading>
          <Button as={Link} to="/admin/pets/list" size="lg" width="100%">
            Go to Pet List Page
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
