import { Heading, Input, Stack, Button} from "@chakra-ui/react";
import { Form, useActionData } from "@remix-run/react";
import { useForm } from "react-hook-form"

interface FormValues {
    firstName: string
    lastName: string
    email: string
    message: string
  }

export default function Contact() {
  const actionData = useActionData();

  return (
    <div>
      <Stack gap = "4">
      <Heading ml={"100px"} color={"orange"} p={"20px"} fontWeight={"bold"} fontSize={"50"}>Contact Us</Heading>
      <Input ml={"150px"} mr={"1000px"}color = {"white"} width = {"1000px"}placeholder = "Enter Your Name" _placeholder={{color: "white"}}/>
      <Input ml={"150px"} mr={"1000px"}color = {"white"} width = {"1000px"}placeholder = "Enter Your Email" _placeholder={{color: "white"}}/>
      <Input ml={"150px"} mr={"1000px"}color = {"white"} width = {"1000px"}placeholder = "Enter Your Message" _placeholder={{color: "white"}}/>
      <Button ml={"150px"} mr={"1000px"}color = {"white"} width = {"1000px"}>Submit</Button>
      </Stack>
    </div>
  );
}


