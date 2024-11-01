import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bgGradient: "linear(360deg, #0335AD, #0575E6, #205E9B)",
        color: "gray.800",
        minHeight: "100vh", // Ensure the gradient covers the full viewport height
      },
    }),
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bgGradient: "linear(225deg, #FD6F01, #FF9000)",
          color: "white",
        },
      },
    },
    Button: {
      baseStyle: {
        _hover: {
          bg: "blue.100",
        },
      },
    },
  },
});

export default theme;
