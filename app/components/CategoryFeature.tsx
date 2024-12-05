import { Box, SimpleGrid, Text, Image, Flex } from '@chakra-ui/react';
import { useNavigate } from '@remix-run/react';

const CategoryFeature = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Clothing', image: 'https://i.ibb.co/f0SVmx1/Designer-50.jpg', bgColor: 'blue.300' },
    { name: 'CSUF', image: 'https://i.ibb.co/0nVGJt1/Cal-State-Fullerton-Titans-Logo.png', bgColor: 'orange.300' },
    { name: 'School Supplies', image: 'https://i.ibb.co/JCyCKyV/Designer-49.jpg', bgColor: 'blue.400' },
    { name: 'Tech', image: 'https://i.ibb.co/Ssmz80v/GUEST-235d8166-e6ab-42c2-9680-ffa1c7e500f6.webp', bgColor: 'orange.400' },
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <Box mt={12} mb={12} px={4} maxWidth="1500px" mx="auto">
      {/* Centered title */}
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Explore Categories
      </Text>
      {/* Grid container */}
      <SimpleGrid columns={[2, 2, 3, 4]} spacing={6}>
        {categories.map((category) => (
          <Box
            key={category.name}
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            backgroundColor={category.bgColor}
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'xl',
              cursor: 'pointer',
            }}
            transition="all 0.3s ease-in-out"
            onClick={() => handleCategoryClick(category.name)}
            position="relative"
          >
            {/* Category image */}
            <Image
              src={category.image}
              alt={category.name}
              width="100%"
              height="200px"
              objectFit="cover"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)' }}
            />
            {/* Overlay with category name */}
            <Flex
              direction="column"
              align="center"
              justify="center"
              bg="rgba(0, 0, 0, 0.5)"
              p={4}
              position="absolute"
              bottom="0"
              width="100%"
            >
              <Text fontSize="lg" fontWeight="bold" color="white" textAlign="center">
                {category.name}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CategoryFeature;
