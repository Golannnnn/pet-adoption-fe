// import { useAuth } from "../components/AuthContext";
import {
  Flex,
  Center,
  Heading,
  Text,
  Input,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//TODO: add option to change email
//TODO: add option to upload profile picture

const Profile = () => {
  const { user, updateUser, loading } = useContext(AuthContext);

  console.log("rendering Profile");

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("number", user.number);
    }
  }, [user]);

  const onSubmit = async (data) => {
    updateUser(data);
  };

  return (
    <Center layerStyle="formCenter">
      <Flex flexDir="column" align="center" justify="center">
        <Flex align="center" justify="center">
          <Avatar
            alt="pet"
            size={{
              base: "xl",
              md: "xl",
            }}
            mr={5}
          />
          <Heading
            textAlign="left"
            size={{
              base: "lg",
              md: "xl",
            }}
          >
            {user.name}'s profile
          </Heading>
        </Flex>
        <Flex layerStyle="formFlex">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "100%",
            }}
          >
            <Text mt={0}>Email</Text>
            <Input
              type="text"
              placeholder="Email"
              layerStyle="formInput"
              {...register("email", {
                required: "Email is required.",
                maxLength: {
                  value: 30,
                  message: "Email should be less than 30 chars.",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid.",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              isDisabled={true}
            />
            {errors.email && (
              <Text layerStyle="formError" role="alert">
                {errors.email.message}
              </Text>
            )}
            <Text mt={3}>First and last name</Text>
            <Input
              type="text"
              placeholder="First and last name"
              layerStyle="formInput"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required.",
                },
                minLength: {
                  value: 3,
                  message: "Name should be at-least 3 chars.",
                },
                maxLength: {
                  value: 30,
                  message: "Name should be less than 30 chars.",
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <Text layerStyle="formError" role="alert">
                {errors.name.message}
              </Text>
            )}
            <Text mt={3}>Phone number</Text>
            <Input
              type="text"
              placeholder="Phone number"
              layerStyle="formInput"
              {...register("number", {
                required: {
                  value: true,
                  message: "Phone is required.",
                },
                pattern: {
                  value:
                    /^(\+?[0-9]{1,3}[-. ]?)?\(?[0-9]{2,3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{2,4}$/,
                  message: "Phone is not valid.",
                },
              })}
              aria-invalid={errors.number ? "true" : "false"}
            />
            {errors.number && (
              <Text layerStyle="formError" role="alert">
                {errors.number.message}
              </Text>
            )}
            <Text mt={3}>Password</Text>
            <Input
              type="password"
              placeholder="Password"
              layerStyle="formInput"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required.",
                },
                minLength: {
                  value: 3,
                  message: "Password should be at-least 3 chars.",
                },
                maxLength: {
                  value: 30,
                  message: "Password should be less than 30 chars.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <Text layerStyle="formError" role="alert">
                {errors.password.message}
              </Text>
            )}
            <Text mt={3}>Confirm password</Text>
            <Input
              type="password"
              placeholder="Confirm password"
              layerStyle="formInput"
              {...register("confirmPassword", {
                validate: (match) => {
                  const password = getValues("password");
                  return match === password || "Passwords should match.";
                },
              })}
            />
            {errors.confirmPassword && (
              <Text layerStyle="formError" role="alert">
                {errors.confirmPassword.message}
              </Text>
            )}
            <Button
              type="submit"
              layerStyle="formInput"
              mt={6}
              isLoading={loading}
            >
              Change details
            </Button>
          </form>
        </Flex>
      </Flex>
    </Center>
  );
};

export default Profile;
