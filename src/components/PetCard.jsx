import {
  Button,
  Text,
  Stack,
  Card,
  CardBody,
  Heading,
  Image,
  Badge,
  CardFooter,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import SaveHeart from "./SaveHeart";
import React from "react";

//TODO: put styles in a separate file

const PetCard = React.memo(({ pet }) => {
  return (
    <Card layerStyle="card">
      <Image
        src={pet.picture}
        alt={pet.bio}
        borderTopRadius={10}
        objectFit="cover"
        maxH={200}
      />

      <SaveHeart petId={pet._id || pet.id} />
      <CardBody>
        <Stack>
          <Heading size="md">{pet.name}</Heading>
          <Text overflow="hidden" textOverflow="ellipsis" maxH="100px">
            {pet.bio}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter layerStyle="cardFooter">
        <Badge
          colorScheme={
            pet.status === "available"
              ? "green"
              : pet.status === "fostered"
              ? "orange"
              : "blue"
          }
          px={3}
          py={1}
          borderRadius={5}
        >
          {pet.status}
        </Badge>
        <Link to={`/pets/${pet.id}`}>
          <Button size="md" rightIcon={<ChevronRightIcon mt={0.5} />}>
            More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

PetCard.displayName = "PetCard";

export default PetCard;
