import {
  Flex,
  Center,
  Heading,
  Text,
  Input,
  Button,
  Select,
  Checkbox,
  Textarea,
  IconButton,
  HStack,
  InputGroup,
  InputRightAddon,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useContext } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { PetContext } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

// style hypoallergenic checkbox and dietary restrictions

const AddPet = () => {
  const { addPet, loading } = useContext(PetContext);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dietaryRestrictions",
  });

  const onSubmit = async (data) => {
    const form = new FormData();

    for (const field in data) {
      if (Object.hasOwnProperty.call(data, field)) {
        if (field === "picture") {
          form.append(field, data[field][0]);
        }
        form.append(field, data[field]);
      }
    }

    await addPet(form, reset);
  };

  const handleAddDietaryRestriction = () => {
    append("");
  };

  const handleRemoveDietaryRestriction = (index) => {
    remove(index);
  };

  return (
    <>
      <BackButton />
      <Center
        mb={10}
        mt={{
          base: 5,
          md: 0,
        }}
        px={5}
      >
        <Flex flexDir="column" align="center" justify="center">
          <Heading
            textAlign="center"
            size={{
              base: "lg",
              md: "xl",
            }}
          >
            Add a new pet
          </Heading>
          <Flex
            layerStyle="formFlex"
            width={{
              xs: "100%",
              sm: "100%",
              base: "100%",
            }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
              }}
            >
              <FormControl>
                <FormLabel htmlFor="name" fontWeight="medium" mt={3}>
                  Name:
                </FormLabel>
                <Input
                  type="text"
                  {...register("name", {
                    required: "Name is required.",
                    maxLength: {
                      value: 20,
                      message: "Name can't be more than 20 characters.",
                    },
                  })}
                  aria-invalid={errors.name ? "true" : "false"}
                  mb={2}
                />
                {errors.name && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.name.message}
                  </Text>
                )}
                <FormLabel htmlFor="type" fontWeight="medium" mt={3}>
                  Animal type:
                </FormLabel>
                <Select
                  {...register("type", { required: "Type is required." })}
                  aria-invalid={errors.type ? "true" : "false"}
                  mb={2}
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="hamster">Hamster</option>
                </Select>
                {errors.type && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.type.message}
                  </Text>
                )}
                <FormLabel htmlFor="breed" fontWeight="medium" mt={3}>
                  Breed:
                </FormLabel>
                <Input
                  type="text"
                  {...register("breed", {
                    required: "Breed is required.",
                    maxLength: {
                      value: 20,
                      message: "Breed should be at most 20 characters long.",
                    },
                  })}
                  aria-invalid={errors.breed ? "true" : "false"}
                  mb={2}
                />
                {errors.breed && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.breed.message}
                  </Text>
                )}
                <FormLabel htmlFor="height" fontWeight="medium" mt={3}>
                  Height:
                </FormLabel>
                <InputGroup mb={2}>
                  <Input
                    type="text"
                    {...register("height", {
                      required: "Height is required.",
                      maxLength: {
                        value: 3,
                        message: "Height can't be more than 3 characters.",
                      },
                      pattern: {
                        value: /^(?!.*[.,]{2})[0-9]+([.,][0-9]+)?$/,
                        message: "Invalid height.",
                      },
                    })}
                    aria-invalid={errors.height ? "true" : "false"}
                  />
                  <InputRightAddon children="cm" />
                </InputGroup>
                {errors.height && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.height.message}
                  </Text>
                )}
                <FormLabel htmlFor="weight" fontWeight="medium" mt={3}>
                  Weight:
                </FormLabel>
                <InputGroup mb={2}>
                  <Input
                    type="text"
                    {...register("weight", {
                      required: "Weight is required.",
                      maxLength: {
                        value: 3,
                        message: "Weight can't be more than 3 characters.",
                      },
                      pattern: {
                        value: /^(?!.*[.,]{2})[0-9]+([.,][0-9]+)?$/,
                        message: "Invalid weight.",
                      },
                    })}
                    aria-invalid={errors.weight ? "true" : "false"}
                  />
                  <InputRightAddon children="kg" />
                </InputGroup>
                {errors.weight && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.weight.message}
                  </Text>
                )}
                <FormLabel htmlFor="color" fontWeight="medium" mt={3}>
                  Color:
                </FormLabel>
                <Select
                  {...register("color", { required: "Color is required." })}
                  aria-invalid={errors.color ? "true" : "false"}
                  mb={2}
                >
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="brown">Brown</option>
                  <option value="gray">Gray</option>
                  <option value="golden">Golden</option>
                  <option value="tan">Tan</option>
                  <option value="red">Red</option>
                  <option value="blonde">Blonde</option>
                  <option value="spotted">Spotted</option>
                  <option value="striped">Striped</option>
                  <option value="ginger">Ginger</option>
                  <option value="silver">Silver</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="pink">Pink</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
                  <option value="yellow">Yellow</option>
                  <option value="other">Other</option>
                </Select>
                {errors.color && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.color.message}
                  </Text>
                )}
                <FormLabel htmlFor="hypoallergenic" fontWeight="medium" mt={3}>
                  Hypoallergenic:
                </FormLabel>
                <RadioGroup defaultValue="no" id="hypoallergenic" mb={2}>
                  <Stack direction="column" spacing={2}>
                    <Radio
                      value="yes"
                      size="lg"
                      {...register("hypoallergenic")}
                      aria-invalid={errors.hypoallergenic ? "true" : "false"}
                    >
                      <Text fontSize="md">Yes</Text>
                    </Radio>
                    <Radio
                      value="no"
                      size="lg"
                      {...register("hypoallergenic")}
                      aria-invalid={errors.hypoallergenic ? "true" : "false"}
                    >
                      <Text fontSize="md">No</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
                <FormLabel
                  htmlFor="dietaryRestrictions"
                  fontWeight="medium"
                  mt={3}
                  mb={2}
                >
                  Dietary Restrictions:
                </FormLabel>
                {fields.map((field, index) => (
                  <HStack key={field.id} mt={2}>
                    <Input
                      name={`dietaryRestrictions[${index}]`}
                      placeholder={index === 0 ? "milk" : ``}
                      {...register(`dietaryRestrictions.${index}`)}
                      defaultValue={field}
                      maxLength={20}
                    />
                    <IconButton
                      size="sm"
                      icon={<FaMinus />}
                      aria-label="Remove"
                      onClick={() => handleRemoveDietaryRestriction(index)}
                    />
                  </HStack>
                ))}
                <Flex align="center" mb={2} mt={2}>
                  <Text mr={2}>Add restriction</Text>
                  <IconButton
                    size="sm"
                    mt={1}
                    icon={<FaPlus />}
                    aria-label="Add"
                    onClick={handleAddDietaryRestriction}
                  />
                </Flex>
                <FormLabel htmlFor="bio" fontWeight="medium" mt={3}>
                  Bio:
                </FormLabel>
                <Textarea
                  {...register("bio", {
                    required: "Bio is required.",
                    maxLength: {
                      value: 200,
                      message: "Bio should be at most 200 characters long.",
                    },
                  })}
                  aria-invalid={errors.bio ? "true" : "false"}
                  mb={2}
                  h={32}
                />
                {errors.bio && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.bio.message}
                  </Text>
                )}
                <FormLabel htmlFor="picture" fontWeight="medium" mt={3}>
                  Upload a picture:
                </FormLabel>
                <Input
                  size="lg"
                  type="file"
                  {...register("picture", {
                    required: "Picture is required.",
                  })}
                  aria-invalid={errors.picture ? "true" : "false"}
                  mb={2}
                  fontSize="md"
                  sx={{
                    "::file-selector-button": {
                      backgroundColor: "gray.200",
                      border: "none",
                      borderRadius: "md",
                      color: "gray.900",
                      fontSize: "sm",
                      fontWeight: "medium",
                      mt: 2,
                      mr: 2,
                      px: 3,
                      py: 1,
                    },
                  }}
                />
                {errors.picture && (
                  <Text color="red.500" fontSize="sm" mb={2}>
                    {errors.picture.message}
                  </Text>
                )}
                <Button
                  type="submit"
                  layerStyle="formInput"
                  mt={4}
                  isLoading={loading}
                >
                  Save
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </Center>
    </>
  );
};

export default AddPet;
