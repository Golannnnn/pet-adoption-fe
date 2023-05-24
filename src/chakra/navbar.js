const navbarBox = {
  backgroundColor: "rgba(0, 0, 0, .01)",

  color: "black",
  borderBottom: "1px solid lightgrey",
  px: {
    sm: 5,
    md: 10,
    lg: 20,
    base: 5,
  },
  py: 4,
};

const navbarFlex = {
  justifyContent: "space-between",
  alignItems: "center",
  mx: {
    sm: 0,
    md: 0,
    lg: 5,
  },
};

const navbarLogo = {
  fontWeight: 900,
  fontSize: 25,
  // display: {
  //   sm: "none",
  //   md: "block",
  //   base: "none",
  // },
  py: 2,
  px: 2,
  borderRadius: 10,
  // backgroundColor: "#F6C391",
  // color: "darkcyan",
};

const navbarCenter = {
  position: "absolute",
  left: 0,
  right: 0,
  height: 10,
};

const navbarLinks = {
  fontWeight: 600,
  fontSize: {
    sm: 17,
    md: 20,
    base: 15,
  },
};

export { navbarBox, navbarFlex, navbarLogo, navbarCenter, navbarLinks };
