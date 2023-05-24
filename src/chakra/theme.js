import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import {
  navbarBox,
  navbarFlex,
  navbarLogo,
  navbarCenter,
  navbarLinks,
} from "./navbar";
import {
  homepageFlex,
  homepageTextFlex,
  homepageH1,
  homepageH2,
  homepageButtonWrapper,
  homepageButton,
} from "./homepage";
import { formCenter, formFlex, formInput, formError } from "./form";
import { searchCollapse, searchColumn } from "./search";
import { card, cardFooter } from "./card";

const theme = extendTheme({
  components: {
    Button,
  },
  layerStyles: {
    navbarBox,
    navbarFlex,
    navbarLogo,
    navbarCenter,
    navbarLinks,
    homepageFlex,
    homepageTextFlex,
    homepageH1,
    homepageH2,
    homepageButtonWrapper,
    homepageButton,
    formCenter,
    formFlex,
    formInput,
    formError,
    searchCollapse,
    searchColumn,
    card,
    cardFooter,
  },
  breakpoints: {
    xs: "22em", // 352px
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  },
});

export default theme;
