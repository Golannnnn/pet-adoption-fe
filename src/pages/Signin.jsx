/* eslint-disable react/no-unescaped-entities */
import {
  Flex,
  Center,
  Heading,
  Text,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
  const { signIn, isLoggedIn, loading, handleGoogleLogin } =
    useContext(AuthContext);
  let navigate = useNavigate();

  console.log("rendering Signin");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/users/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const onSubmit = async (data) => {
    signIn(data);
  };

  console.log("rendering Signin");

  return (
    <Center layerStyle="formCenter">
      <Flex flexDir="column" align="center" justify="center">
        <Heading
          textAlign="center"
          size={{
            base: "lg",
            md: "xl",
          }}
        >
          Log in to your account
        </Heading>

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
            />
            {errors.email && (
              <Text layerStyle="formError" role="alert">
                {errors.email.message}
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
            <Button
              type="submit"
              layerStyle="formInput"
              mt={6}
              isLoading={loading}
            >
              Sign in
            </Button>
          </form>
        </Flex>
        <Button
          layerStyle="formInput"
          w="90%"
          mt={6}
          onClick={handleGoogleLogin}
          leftIcon={<FcGoogle />}
        >
          Sign in with Google
        </Button>
        <Text mt={5}>
          Don't have an account?{" "}
          <Link
            color="blue.500"
            layerStyle="formLink"
            onClick={() => navigate("/users/signup")}
          >
            Sign up
          </Link>
        </Text>
      </Flex>
    </Center>
  );
};

export default Signin;
