import React from "react";
import { Box, Image, Text, Button } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

interface Slide {
  image: string;
  title: string;
  description: string;
  link: string;
}

const SlideData: Slide[] = [
  {
    image: "https://i.ibb.co/d03jTn3/Untitled-Project-1.jpg",
    title: "Start Saving Today!",
    description: "Your go-to marketplace for the best deals online.",
    link: "/deals",
  },
  {
    image: "https://i.ibb.co/BwZcKpt/Designer-48.jpg",
    title: "Exclusive Designer Collections",
    description: "Explore our exclusive collection of designer pieces.",
    link: "/designer-collections",
  },
];

const HeroSection: React.FC = () => {
  return (
    <Box
      w="100%"
      p={0}
      color="white"
      maxW="1500px"
      mx="auto"
      overflow="hidden"
      position="relative"
    >
      <Carousel
        infiniteLoop
        autoPlay
        showThumbs={false}
        showStatus={false}
        interval={5000}
        emulateTouch
        stopOnHover
      >
        {SlideData.map((slide, index) => (
          <Box key={index} position="relative" border="none">
            <Image
              src={slide.image}
              alt={slide.title}
              objectFit="cover"
              width="100%"
              height={{ base: "300px", md: "450px", lg: "600px" }}
              loading="lazy"
              transition="transform 0.5s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            />
            <Box
              position="absolute"
              bottom="10%"
              left={{ base: "5%", md: "10%" }}
              zIndex={1}
              maxW="lg"
              textAlign={{ base: "center", md: "left" }}
              bg="rgba(0, 0, 0, 0.5)"
              p={5}
              borderRadius="md"
              width={{ base: "80%", sm: "70%", md: "50%" }}
            >
              <Text
                fontSize={{ base: "5vw", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                mb={2}
                textAlign={{ base: "center", md: "left" }}
              >
                {slide.title}
              </Text>
              <Text
                fontSize={{ base: "4vw", md: "lg" }}
                mb={4}
                textAlign={{ base: "center", md: "left" }}
              >
                {slide.description}
              </Text>
              <Button
                as={Link}
                to={slide.link}
                colorScheme="teal"
                size="lg"
                width="100%"
                maxW="200px"
                _hover={{
                  bg: "teal.700",
                  transform: "scale(1.05)",
                }}
                transition="transform 0.2s ease-in-out"
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default HeroSection;
