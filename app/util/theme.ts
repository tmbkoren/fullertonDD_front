import { extendTheme, ThemeConfig } from "@chakra-ui/react";

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
      
      // Feedback and status colors (success, warning, error states)
      feedback: {
        success: "#28A745", // Green
        warning: "#FFC107", // Yellow
        error: "#DC3545",   // Red
      },
  
      // Grayscale (used for borders, backgrounds, and less prominent elements)
      gray: {
        100: "#f7fafc",  // Light gray for backgrounds
        500: "#6C757D",  // Medium gray for text or icons
        900: "#343A40",  // Dark gray
      },
  
      // Navbar colors for easy access in the Navbar component
      navbar: {
        light: "#ADD8E6",  // Light blue for navbar
        dark: "#003366",   // Dark blue for navbar
        text: "white",     // Text color for navbar
      },
  
      // Search bar colors
      searchbar: {
        background: "#F0F8FF", // Very light blue
        border: "#D1E7FF",     // Light blue border
        text: "#003366",       // Dark text in search bar
      },
  
      // Product colors
      product: {
        background: "#FFFFFF", // White product background
        border: "#E0E0E0",     // Light gray border around product
        hover: "#F9F9F9",      // Subtle hover background
      },
  
      // General background and text colors
      background: {
        light: "#FFFFFF",  // General light background (default)
        dark: "#1A202C",   // Dark background for dark mode
      },
      text: {
        light: "#333333",  // Dark gray text for light backgrounds
        dark: "#FFFFFF",   // White text for dark backgrounds
      },
    },
  styles: {
    global: (props) => ({
      body: {
        bgGradient: "linear(to-r, #FF5733, #FFBD33)", //background color , behind card components
        //bg: "white",
        color: "gray.800",
        minHeight: "100vh",
      },
    }),
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bgGradient: "linear(225deg, #FD6F01, #FFB000)",
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
