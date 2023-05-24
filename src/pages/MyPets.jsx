/* eslint-disable react/no-unescaped-entities */
import {
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PetContext } from "../context/PetContext";
import PetCard from "../components/PetCard";

const MyPets = () => {
  const { user } = useContext(AuthContext);
  const { pets } = useContext(PetContext);

  const savedPets = pets
    ? pets.filter((pet) => pet.savedBy.includes(user.id))
    : [];
  const adoptedPets = pets
    ? pets.filter((pet) => pet.adoptedBy === user.id)
    : [];
  const fosteredPets = pets
    ? pets.filter((pet) => pet.fosteredBy === user.id)
    : [];

  const renderPets = (pets, emptyText) => {
    return (
      <Flex mt={5} wrap="wrap" align="center" justify="center" gap={10}>
        {pets.length > 0 ? (
          pets.map((pet) => pet && <PetCard key={pet.id} pet={pet} />)
        ) : (
          <Text>{emptyText}</Text>
        )}
      </Flex>
    );
  };

  return (
    <Center mx={5} my={10}>
      <Tabs isFitted={true} variant="soft-rounded" colorScheme="orange">
        <Center>
          <TabList
            mb="1em"
            gap={5}
            w={{
              sm: 300,
              md: 500,
              lg: 700,
              base: 300,
            }}
          >
            <Tab>Saved</Tab>
            <Tab>Fostered</Tab>
            <Tab>Adopted</Tab>
          </TabList>
        </Center>
        <TabPanels>
          <TabPanel>
            {renderPets(savedPets, "You don't have any saved pets.")}
          </TabPanel>
          <TabPanel>
            {renderPets(fosteredPets, "You don't have any fostered pets.")}
          </TabPanel>
          <TabPanel>
            {renderPets(adoptedPets, "You don't have any adopted pets.")}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default MyPets;
