import {
  Flex,
  Heading,
  Button,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
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

  const buttonStyles = {
    bg: "#F6C391",
    color: "black",
    _hover: {
      bg: "darkcyan",
      color: "white",
    },
    width: isMobile && "280px",
    py: isMobile && 8,
  };

  const textButtonStyles = {
    fontSize: {
      sm: "xl",
      md: "lg",
      base: "xl",
    },
    pl: isMobile && 2,
  };

  const iconStyles = {
    size: isMobile && "25px",
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
            pb={isMobile && 1}
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
                  <Button
                    {...buttonStyles}
                    rightIcon={!isMobile && <FaPaw {...iconStyles} />}
                    justifyContent={isMobile && "space-between"}
                  >
                    <Text {...textButtonStyles}>View our pets</Text>
                    {isMobile && <FaPaw {...iconStyles} />}
                  </Button>
                </NavLink>
                <NavLink to="/users/mypets">
                  <Button
                    {...buttonStyles}
                    rightIcon={!isMobile && <GiSittingDog {...iconStyles} />}
                    justifyContent={isMobile && "space-between"}
                  >
                    <Text {...textButtonStyles}>Manage your pets</Text>
                    {isMobile && <GiSittingDog {...iconStyles} />}
                  </Button>
                </NavLink>
                <NavLink to="/users/profile">
                  <Button
                    {...buttonStyles}
                    rightIcon={!isMobile && <FaUserCircle {...iconStyles} />}
                    justifyContent={isMobile && "space-between"}
                  >
                    <Text {...textButtonStyles}>View your profile</Text>
                    {isMobile && <FaUserCircle {...iconStyles} />}
                  </Button>
                </NavLink>
                {user.isAdmin && (
                  <NavLink to="/admin/dashboard">
                    <Button
                      {...buttonStyles}
                      rightIcon={
                        !isMobile && <MdSpaceDashboard {...iconStyles} />
                      }
                      justifyContent={isMobile && "space-between"}
                    >
                      <Text {...textButtonStyles}>Dashboard</Text>
                      {isMobile && <MdSpaceDashboard {...iconStyles} />}
                    </Button>
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink to="/users/signup">
                  <Button
                    {...buttonStyles}
                    rightIcon={!isMobile && <TiUserAdd {...iconStyles} />}
                    justifyContent={isMobile && "space-between"}
                  >
                    <Text {...textButtonStyles}>Create an account</Text>
                    {isMobile && <TiUserAdd {...iconStyles} />}
                  </Button>
                </NavLink>
                {!isMobile && <GrLinkNext />}
                <NavLink to="/search">
                  <Button
                    {...buttonStyles}
                    rightIcon={!isMobile && <FaPaw {...iconStyles} />}
                    justifyContent={isMobile && "space-between"}
                  >
                    <Text {...textButtonStyles}>View our pets</Text>
                    {isMobile && <FaPaw {...iconStyles} />}
                  </Button>
                </NavLink>
                {!isMobile && <GrLinkNext />}
                <NavLink to="/pets/6460b734815858363a21a3a5">
                  <Button
                    {...buttonStyles}
                    rightIcon={
                      !isMobile && <BsFillHouseHeartFill {...iconStyles} />
                    }
                    justifyContent={isMobile && "space-between"}
                  >
                    <Text {...textButtonStyles}>Adopt a pet</Text>
                    {isMobile && <BsFillHouseHeartFill {...iconStyles} />}
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
