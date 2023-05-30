import {
  Center,
  Flex,
  Box,
  Text,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { TbDog } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const btnRef = useRef();

  const { user, signOut } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box layerStyle="navbarBox">
        <Flex layerStyle="navbarFlex">
          {isMobile ? (
            <>
              <Button
                ref={btnRef}
                onClick={onOpen}
                style={{
                  zIndex: 999,
                }}
              >
                <HamburgerIcon />
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="xs"
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader fontSize="xl" borderBottomWidth="1px">
                    Menu
                  </DrawerHeader>

                  <DrawerBody fontSize="xl" mt={3} borderBottomWidth="1px">
                    <NavLink to="/" onClick={onClose}>
                      <Text mb={5}>Home</Text>
                    </NavLink>

                    {!user && (
                      <>
                        <NavLink to="/users/signup" onClick={onClose}>
                          <Text mb={5}>Sign up</Text>
                        </NavLink>

                        <NavLink to="/users/signin" onClick={onClose}>
                          <Text mb={5}>Login</Text>
                        </NavLink>
                      </>
                    )}

                    <NavLink to="/search" onClick={onClose}>
                      <Text mb={5}>Search</Text>
                    </NavLink>

                    {user && (
                      <NavLink to="/users/mypets" onClick={onClose}>
                        <Text mb={5}>My pets</Text>
                      </NavLink>
                    )}

                    <NavLink to="/about" onClick={onClose}>
                      <Text mb={5}>About</Text>
                    </NavLink>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <NavLink to="/">
              <Flex align="center">
                <TbDog
                  style={{
                    fontSize: "40px",
                    color: "#9C4221",
                  }}
                />
                <Text layerStyle="navbarLogo">
                  <span
                    style={{
                      color: "#9C4221",
                    }}
                  >
                    PET
                  </span>
                  OPIA
                </Text>
              </Flex>
            </NavLink>
          )}
          <Center layerStyle="navbarCenter">
            {isMobile ? (
              <NavLink to="/">
                <Flex align="center">
                  <TbDog
                    style={{
                      fontSize: "30px",
                      color: "#9C4221",
                    }}
                  />
                  <Text layerStyle="navbarLogo" fontSize="lg">
                    <span
                      style={{
                        color: "#9C4221",
                      }}
                    >
                      PET
                    </span>
                    OPIA
                  </Text>
                </Flex>
              </NavLink>
            ) : (
              <>
                <Text layerStyle="navbarLinks">
                  <NavLink
                    to="/"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "500" : "300",
                      };
                    }}
                  >
                    Home
                  </NavLink>
                </Text>
                <Divider orientation="vertical" mr={5} ml={5} />
                <Text layerStyle="navbarLinks">
                  <NavLink
                    to="/search"
                    style={({ isActive }) => {
                      return {
                        fontWeight: isActive ? "500" : "300",
                      };
                    }}
                  >
                    Search
                  </NavLink>
                </Text>
                {user && (
                  <>
                    <Divider orientation="vertical" mr={5} ml={5} />
                    <Text layerStyle="navbarLinks">
                      <NavLink
                        to="/users/mypets"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "500" : "300",
                          };
                        }}
                      >
                        My pets
                      </NavLink>
                    </Text>
                  </>
                )}
                {user && user.isAdmin && (
                  <>
                    <Divider orientation="vertical" mr={5} ml={5} />
                    <Text layerStyle="navbarLinks">
                      <NavLink
                        to="/admin/dashboard"
                        style={({ isActive }) => {
                          return {
                            fontWeight: isActive ? "500" : "300",
                          };
                        }}
                      >
                        Dashboard
                      </NavLink>
                    </Text>
                  </>
                )}
              </>
            )}
          </Center>
          <Flex align="center">
            {user ? (
              <>
                <Menu>
                  <MenuButton as={Button}>
                    <Flex align="center" gap={2}>
                      <AiOutlineUser />
                      {!isMobile && user.name}
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <NavLink to="/users/profile">
                        <MenuItem>My account</MenuItem>
                      </NavLink>
                      <NavLink to="/users/mypets">
                        <MenuItem>My pets</MenuItem>
                      </NavLink>
                      {user.isAdmin && (
                        <NavLink to="/admin/dashboard">
                          <MenuItem>Dashboard</MenuItem>
                        </NavLink>
                      )}
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup>
                      <MenuItem onClick={signOut}>Logout</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <NavLink to="/users/signin">
                  <Button mr={isMobile ? 0 : 2}>Login</Button>
                </NavLink>
                {!isMobile && (
                  <NavLink to="/users/signup">
                    <Button variant="outline">Signup</Button>
                  </NavLink>
                )}
              </>
            )}
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};

export default Navbar;
