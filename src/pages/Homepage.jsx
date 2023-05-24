import { Flex, Heading, Button, useBreakpointValue } from "@chakra-ui/react";
import header from "../assets/header.png";
import { FaPaw, FaUserCircle } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { GrLinkNext, GrLinkDown } from "react-icons/gr";
import { BsFillHouseHeartFill } from "react-icons/bs";
import { GiSittingDog } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  console.log("rendering Homepage");

  const buttonStyles = {
    bg: "#F6C391",
    color: "black",
    _hover: {
      bg: "darkcyan",
      color: "white",
    },
  };

  return (
    <>
      <Flex
        layerStyle="homepageFlex"
        backgroundImage={header}
        align={{
          sm: "start",
          lg: "center",
          base: "start",
        }}
        justify={{
          sm: "center",
          lg: "start",
          base: "center",
        }}
      >
        <Flex layerStyle="homepageTextFlex">
          <Heading
            textAlign={{
              sm: "center",
              md: "left",
              base: "center",
            }}
            as="h1"
            size={{
              sm: "lg",
              lg: "xl",
              base: "lg",
            }}
            pt={10}
            pb={0}
            borderRadius={10}
            fontWeight="regular"
            color="#4F4F4F"
          >
            {user ? `Welcome, ${user.name}!` : "Welcome to Petopia!"}
          </Heading>
          <Heading
            textAlign={{
              sm: "center",
              md: "left",
              base: "center",
            }}
            as="h1"
            size={{
              sm: "xl",
              md: "2xl",
              lg: "3xl",
              base: "xl",
            }}
            borderRadius={10}
          >
            {user
              ? "What would you like to do?"
              : "Discover your new companion"}
          </Heading>
          <Flex
            mt={5}
            gap={5}
            align="center"
            flexDirection={{
              sm: "column",
              md: "row",
              base: "column",
            }}
          >
            {user ? (
              <>
                <NavLink to="/search">
                  <Button {...buttonStyles} rightIcon={<FaPaw />}>
                    View our pets
                  </Button>
                </NavLink>
                <NavLink to="/users/mypets">
                  <Button {...buttonStyles} rightIcon={<GiSittingDog />}>
                    Manage your pets
                  </Button>
                </NavLink>
                <NavLink to="/users/profile">
                  <Button {...buttonStyles} rightIcon={<FaUserCircle />}>
                    View your profile
                  </Button>
                </NavLink>
                {user.isAdmin && (
                  <NavLink to="/admin/dashboard">
                    <Button {...buttonStyles} rightIcon={<MdSpaceDashboard />}>
                      Dashboard
                    </Button>
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/users/signup">
                  <Button {...buttonStyles} rightIcon={<TiUserAdd />}>
                    Create an account
                  </Button>
                </NavLink>
                {isMobile ? <GrLinkDown /> : <GrLinkNext />}
                <NavLink to="/search">
                  <Button {...buttonStyles} rightIcon={<FaPaw />}>
                    View our pets
                  </Button>
                </NavLink>
                {isMobile ? <GrLinkDown /> : <GrLinkNext />}
                <NavLink to="/pets/64525ad7787d09c27ebe3bc2">
                  <Button
                    {...buttonStyles}
                    rightIcon={<BsFillHouseHeartFill />}
                  >
                    Adopt a pet
                  </Button>
                </NavLink>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Homepage;
