import { extendTheme, ThemeConfig, SystemStyleObject } from "@chakra-ui/react";

// Color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  colors: {
      // Primary and secondary brand colors (for branding elements like logos, key buttons)
      brand: {
        100: "#f7fafc",  // Light grayish for backgrounds
        500: "#007BFF",  // Blue as the primary brand color
        900: "#1a202c",  // Dark navy for contrasts and key highlights
      },

      searchbar: {
        background: "#F0F8FF", // Very light blue
        border: "#D1E7FF",     // Light blue border
        text: "#003366",       // Dark text in search bar
      },

      navbar:{
        bgGradient: "linear(360deg, #0335AD, #0575E6, #205E9B)",
      },

      // these colors overide global and are use for the footer located in footer.tsx
      footer: {
        bg: "#003366",  // Dark blue background
        text: "#FFFFFF", // White text
      },
    },


    styles: { 
      global: (props: { colorMode: 'light' | 'dark' }): SystemStyleObject => ({
        body: {
          // Change background gradient based on color mode

          bgGradient: props.colorMode === "dark"
            ? "linear(360deg, #000000, #434343)"  // Dark mode gradient
            : "none",  // No gradient in light mode, you can adjust to other styles if needed

          color: {
            light: "black",  // Text color for light mode
            dark: "white",   // Text color for dark mode
          },
           
          minHeight: "100vh",
        },
      }),
    },

  components: {
    Card: {
      baseStyle: {
        container: {
          bgGradient: {
            light: "linear(225deg, #FD6F01, #FF9000)",  // Gradient for light mode
            dark: "linear(225deg, #2D3748, #4A5568)",   // Gradient for dark mode (darker tones)
          },
          color: {
            light: "black",  // Text color for light mode
            dark: "white",   // Text color for dark mode
          },
        },
      },
    },
    Button: {
      baseStyle: { 
      },
      variants: { // variant added to app/components/ItemDisplay.tsx
        addToCart: {
          mt : 2.5,
          rounded: "xl",
          bg: "gold", // change the background color for product card button "Add to Cart"
          _hover: {
            bg: "yellow.500",
          },
          color: "black", // fixed color for test in all modes
        },
      },
    },
  },
});

export default theme;
