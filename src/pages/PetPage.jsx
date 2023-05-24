import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import petService from "../services/pets";
import userService from "../services/users";
import {
  Center,
  Button,
  Flex,
  Image,
  Text,
  Heading,
  Divider,
  Badge,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  BsFillEmojiHeartEyesFill,
  BsFillEmojiSmileFill,
  BsEmojiFrownFill,
} from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { PetContext } from "../context/PetContext";
import useToastService from "../hooks/useToastService";
import MyAlert from "../components//MyAlert";
import SaveHeart from "../components/SaveHeart";
import BackButton from "../components/BackButton";

//when clicking on adopt, change adoptedBy field in pet to user id and push pet id to user's adoptedPets array
//make two functions, one for changing adoptedBy field and one for pushing pet id to user's adoptedPets array

const PetPage = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { pets, changePetStatus, loading } = useContext(PetContext);
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  console.log("rendering PetPage");

  useEffect(() => {
    if (pets) {
      const pet = pets.find((pet) => pet.id === petId);
      if (pet) {
        setPet(pet);
      }
    }
  }, [petId, pets]);

  const restrictions =
    pet?.dietaryRestrictions.length > 0 &&
    pet?.dietaryRestrictions[0] !== "" ? (
      pet.dietaryRestrictions.map((item) => (
        <Badge
          key={Math.floor(Math.random() * 1000)}
          colorScheme="red"
          px={2}
          py={1}
          borderRadius={5}
        >
          {item}
        </Badge>
      ))
    ) : (
      <Badge colorScheme="green" px={2} py={1} borderRadius={5}>
        None
      </Badge>
    );

  const handleFoster = changePetStatus(petId, "foster", onOpen);
  const handleAdopt = changePetStatus(petId, "adopt", onOpen);
  const handleReturn = changePetStatus(petId, "return", onOpen);

  return (
    <>
      <BackButton />
      <Center
        mx={5}
        mb={10}
        mt={{
          base: 10,
          md: 0,
        }}
      >
        {pet && (
          <Flex
            flexDirection={{
              md: "column",
              lg: "row",
              base: "column",
            }}
            mt={{
              md: 0,
              lg: 10,
              base: 0,
            }}
          >
            <Flex flexDir="column" position="relative">
              <Image
                src={pet.picture}
                alt={pet.bio}
                borderRadius={10}
                objectFit="cover"
                maxH={380}
              />
              <SaveHeart petId={petId} />
            </Flex>
            <VStack
              ml={{
                md: 0,
                lg: 10,
                base: 0,
              }}
              mt={{
                md: 5,
                lg: 1,
                base: 5,
              }}
              alignItems="flex-start"
              spacing={{
                md: 3,
                lg: 5,
                base: 3,
              }}
              maxW={450}
            >
              <Heading
                fontSize={{
                  md: "2xl",
                  lg: "4xl",
                  base: "2xl",
                }}
              >
                Meet {pet.name}!
              </Heading>
              <Text
                fontSize={{
                  md: "lg",
                  lg: "xl",
                  base: "lg",
                }}
                pb={2}
              >
                {pet.bio}
              </Text>
              <Flex gap={3} flexWrap="wrap">
                <Badge colorScheme="blue" px={2} py={1} borderRadius={5}>
                  Breed: {pet.breed}
                </Badge>
                <Badge colorScheme="blue" px={2} py={1} borderRadius={5}>
                  Color: {pet.color}
                </Badge>
                <Badge colorScheme="blue" px={2} py={1} borderRadius={5}>
                  Height: {pet.height} cm
                </Badge>
                <Badge colorScheme="blue" px={2} py={1} borderRadius={5}>
                  Weight: {pet.weight} kg
                </Badge>
                {pet.hypoallergenic && (
                  <Badge colorScheme="blue" px={2} py={1} borderRadius={5}>
                    Hypoallergenic
                  </Badge>
                )}
              </Flex>
              <HStack mt={3}>
                <Text fontWeight="semibold">Dietary Restrictions:</Text>
                {restrictions}
              </HStack>
              <Divider />
              <Flex>
                {!user ? (
                  <Text>
                    <Link
                      to="/users/signin"
                      style={{
                        color: "#3182ce",
                      }}
                    >
                      Login
                    </Link>{" "}
                    or{" "}
                    <Link
                      to="/users/signup"
                      style={{
                        color: "#3182ce",
                      }}
                    >
                      Signup
                    </Link>{" "}
                    to adopt or foster {pet.name}.
                  </Text>
                ) : pet.status === "available" ? (
                  <>
                    {isVisible ? (
                      <MyAlert
                        name={pet.name}
                        status={pet.status}
                        onClose={onClose}
                      />
                    ) : (
                      <>
                        <Button
                          mr={5}
                          leftIcon={<BsFillEmojiSmileFill />}
                          colorScheme="teal"
                          variant="outline"
                          onClick={handleFoster}
                          isLoading={loading}
                        >
                          Foster
                        </Button>
                        <Button
                          leftIcon={<BsFillEmojiHeartEyesFill />}
                          colorScheme="teal"
                          onClick={handleAdopt}
                          isLoading={loading}
                        >
                          Adopt
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <Flex flexDirection="column">
                    {user.id === pet.fosteredBy || user.id === pet.adoptedBy ? (
                      <>
                        {isVisible && (
                          <MyAlert
                            name={pet.name}
                            status={pet.status}
                            onClose={onClose}
                          />
                        )}
                        {!isVisible && (
                          <>
                            <Text mb={5}>
                              You are currently{" "}
                              {pet.status === "fostered"
                                ? "fostering"
                                : "adopting"}{" "}
                              {pet.name}.
                            </Text>
                            <Flex gap={5} align="center">
                              {pet.status === "fostered" && (
                                <Button
                                  size="md"
                                  leftIcon={<BsFillEmojiHeartEyesFill />}
                                  colorScheme="teal"
                                  onClick={handleAdopt}
                                  isLoading={loading}
                                >
                                  Adopt
                                </Button>
                              )}
                              <Button
                                size="md"
                                leftIcon={<BsEmojiFrownFill />}
                                colorScheme="teal"
                                variant="outline"
                                onClick={handleReturn}
                                isLoading={loading}
                              >
                                Return to the shelter
                              </Button>
                            </Flex>
                          </>
                        )}
                      </>
                    ) : (
                      <Text>
                        {pet.name} has been {pet.status}.
                      </Text>
                    )}
                  </Flex>
                )}
              </Flex>
            </VStack>
          </Flex>
        )}
      </Center>
    </>
  );
};

export default PetPage;
