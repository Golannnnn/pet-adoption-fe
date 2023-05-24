const homepageFlex = {
  width: "100%",
  height: "80vh",
  px: {
    sm: 5,
    md: 10,
    lg: 20,
    base: 5,
  },
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: {
    sm: "bottom",
    md: "bottom",
    lg: "right 5% bottom 50%",
    base: "bottom",
  },
};

const homepageTextFlex = {
  flexDir: "column",
  align: {
    sm: "center",
    md: "flex-start",
    base: "center",
  },
  ml: {
    sm: 0,
    md: 10,
    base: 0,
  },
  pb: 10,
  bg: {
    sm: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 100%)",
    lg: "transparent",
    base: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0) 100%)",
  },
};

const homepageH1 = {
  textAlign: {
    sm: "center",
    md: "left",
    base: "center",
  },
  as: "h1",
  size: {
    sm: "lg",
    lg: "xl",
    base: "lg",
  },
  pt: 10,
  pb: 0,
  borderRadius: 10,
  fontWeight: "regular",
  color: "#4F4F4F",
};

const homepageH2 = {
  textAlign: {
    sm: "center",
    md: "left",
    base: "center",
  },
  as: "h1",
  size: {
    sm: "xl",
    md: "2xl",
    lg: "3xl",
    base: "xl",
  },
  borderRadius: 10,
};

const homepageButtonWrapper = {
  mt: 5,
  gap: 5,
  align: "center",
  flexDirection: {
    sm: "column",
    md: "row",
    base: "column",
  },
};

const homepageButton = {
  bg: "#F6C391",
  color: "black",
  _hover: {
    bg: "darkcyan",
    color: "white",
  },
};

export {
  homepageFlex,
  homepageTextFlex,
  homepageH1,
  homepageH2,
  homepageButtonWrapper,
  homepageButton,
};
