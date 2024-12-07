import { extendTheme, ThemeConfig, SystemStyleObject } from "@chakra-ui/react";

// Color mode config
const config: ThemeConfig = {
  initialColorMode: "dark", // Default to dark mode
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#f7fafc", // Light grayish for backgrounds
      500: "#007BFF", // Blue as the primary brand color
      900: "#1a202c", // Dark navy for contrasts and key highlights
    },
    searchbar: {
      background: "#F0F8FF", // Very light blue
      border: "#D1E7FF", // Light blue border
      text: "#003366", // Dark text in search bar
    },


    navbar: {
      light: {
        bg: "#14204a", // Darker blue background for light mode
        text: "#FFFFFF", // White text for better contrast on dark background
      },
      dark: {
        bg: "#1a202c", // Dark background for dark mode
        text: "#FFFFFF", // White text for dark mode
      },
    },

    footer: {
      bg: "#003366", // Dark blue background
      text: "#FFFFFF", // White text
    },
  },
  styles: {
    global: (props: { colorMode: "light" | "dark" }): SystemStyleObject => ({
      body: {
        bgGradient: props.colorMode === "dark"
          ? "linear-gradient(90deg, #0d0d0d, #1f1f1f,)" // Dark mode gradient
          : "none", 
        color: props.colorMode === "dark" ? "white" : "black", // Text color based on color mode
        minHeight: "100vh",
      },

      ".navbar": {
        backgroundColor: props.colorMode === "dark" 
          ? "navbar.dark.bg" 
          : "navbar.light.bg", // Change navbar background based on color mode
        color: props.colorMode === "dark" 
          ? "navbar.dark.text" 
          : "navbar.light.text", // Change text color based on color mode
      },
    }),
  },

  components: {
    Button: {
      baseStyle: {
        rounded: "xl", // Rounded corners for button
        color: "black", // Default text color
        
      },
      variants: {
        addToCart: {
          mt: 2.5,
          bg: "gold", // Gold background for light mode
          _hover: {
            bg: "yellow.500", // Yellow hover state for light mode
          },
          color: "black", // Text color for light mode

          // Dark mode styles
          _dark: {
            bg: "cyan.700", 
            _hover: {
              bg: "cyan.800",
            },
            color: "white", // White text in dark mode
            boxShadow: "0 1px 8px 0px rgb(72 187 120 / 43%)", // Add the shadow effect for dark mode
          _focus: {
            bg: "blue.500", 
          },
          },
        },
      },
    },
  },
});

export default theme;
