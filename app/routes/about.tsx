import { Heading, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div>
      
      <Heading ml={"100px"} color={"orange"} p={"20px"} fontWeight={"bold"} fontSize={"50"}>About Us</Heading>
      <Text ml={"200px"} color={"white"} fontSize={"30"}>We at Fullerton Deal Depot are a suborganization of the California State Unitversity of Fullerton Founded by local students of the 
        University. Our mission is to bring a variety of high quality school products to students, propective students and alumni alike at 
        an affordable price. We prioritize customer satisfaction above all else and can almost guarentee better prices for our products cannot 
        be found anywhere else.
      </Text>
      
    </div>
  );
}