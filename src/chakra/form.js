const formCenter = {
  // p: {
  //   sm: 7,
  //   md: 10,
  //   base: 7,
  // },
  py: 7,
  px: 5,
};

const formFlex = {
  flexDir: "column",
  alignItems: "center",
  justifyContent: "center",
  width: {
    xs: "100%",
    sm: "100%",
    base: "100%",
  },
  p: 5,
  mt: 10,
  border: "1px solid lightgrey",
  borderRadius: 10,
};

const formInput = {
  width: "100%",
  mt: 2,
  mb: 0,
  border: "1px solid lightgrey",
  borderRadius: 10,
};

const formError = {
  color: "red.500",
  fontSize: "sm",
  mt: 1,
};

export { formCenter, formFlex, formInput, formError };
