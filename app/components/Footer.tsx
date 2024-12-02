import {
    Box,
    Stack,
    Flex,
    Image,
    HStack,
    Link,
    Divider,
    VStack,
    Icon,
    Text,
  } from "@chakra-ui/react";
  import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
  import { FiTwitter } from "react-icons/fi";
  import { GrInstagram } from "react-icons/gr";
  
  const Footer: React.FC = () => {
    return (
      <Box
        bg='footer.bg' // Dark Gray background
        color='footer.text' // White text from theme
        as='footer'
        position={'absolute'}
        bottom={0}
        w={'100%'}
        mt={10}
        p={3}
      >
        <Stack
          direction={{
            base: 'column',
            lg: 'row',
          }}
          w='full'
          justify='space-between'
          p={10}
        >
          <Flex justify='center'>
            <Image
              src='/img/logo.svg'
              alt='Company Logo'
              rounded='lg'
              width={{
                base: '150px',
                lg: '200px',
              }}
              height={{
                base: '75px',
                lg: '100px',
              }}
              my={{
                base: 2,
                lg: 0,
              }}
            />
          </Flex>

          {/* Links Section 1 */}
          <HStack
            alignItems='start'
            flex={1}
            justify='space-around'
            fontSize={{
              base: '12px',
              md: '16px',
            }}
            color='footer.text'
            textAlign={{
              base: 'center',
              md: 'left',
            }}
          >
            <Flex
              justify='start'
              direction='column'
            >
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Pre-Sale FAQS
              </Link>
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Submit a ticket
              </Link>
            </Flex>
            <Flex
              justify='start'
              direction='column'
            >
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Services
              </Link>
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Theme Tweak
              </Link>
            </Flex>
          </HStack>

          {/* Links Section 2 */}
          <HStack
            alignItems='start'
            flex={1}
            justify='space-around'
            fontSize={{
              base: '12px',
              md: '16px',
            }}
            color='footer.text'
            textAlign={{
              base: 'center',
              md: 'left',
            }}
          >
            <Flex
              justify='start'
              direction='column'
            >
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Show Case
              </Link>
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Widget Kit
              </Link>
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Support
              </Link>
            </Flex>
            <Flex
              justify='start'
              direction='column'
            >
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                About Us
              </Link>
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Contact Us
              </Link>
              <Link
                textTransform='uppercase'
                color='footer.text'
              >
                Resources
              </Link>
            </Flex>
          </HStack>
        </Stack>

        {/* Divider */}
        <Divider
          w='95%'
          mx='auto'
          borderColor='footer.text' // Make sure divider color is the same
          h='3.5px'
        />

        {/* Social Media and Copyright Section */}
        <VStack py={3}>
          <HStack justify='center'>
            <Link>
              <Icon
                color='footer.text' // Apply footer text color
                h='20px'
                w='20px'
                as={FaFacebookF}
              />
            </Link>
            <Link>
              <Icon
                color='footer.text' // Apply footer text color
                h='20px'
                w='20px'
                as={FiTwitter}
              />
            </Link>
            <Link>
              <Icon
                color='footer.text' // Apply footer text color for Instagram
                h='20px'
                w='20px'
                as={GrInstagram}
              />
            </Link>
            <Link>
              <Icon
                color='footer.text' // Apply footer text color
                h='20px'
                w='20px'
                as={FaLinkedinIn}
              />
            </Link>
          </HStack>

          <Text
            textAlign='center'
            fontSize='smaller'
            color='footer.text' // Apply footer text color
          >
            &copy;Copyright. All rights reserved.
          </Text>
        </VStack>
      </Box>
    );
  };
  
  export default Footer;
  