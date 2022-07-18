import { Box, Button, Image, Badge, Text, HStack } from "@chakra-ui/react";
import Photo from "../clfinal.jpg";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <Box
      w="300px"
      rounded="20px"
      boxShadow="sm"
      bg="gray.200"
      overflow="hidden"
    >
      <Image src={Photo} />
      <Box p={5}>
        <Text
          textTransform="uppercase"
          fontSize="sm"
          color="gray.500"
          letterSpacing="wide"
        >
          25 August 2022 &bull; 20:00
        </Text>
        <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
          UEFA Champions League Final 2022
        </Text>
        <Text fontWeight="light" fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
          pretium ipsum sollicitudin semper. Phasellus eget erat feugiat,
          efficitur enim quis, luctus dolor.
        </Text>
        <HStack align="baseline" justify="space-between">
          <Text fontWeight="semibold" fontSize="lg">
            $150
          </Text>
          <Badge variant="solid" rounded="full" colorScheme="green" px={2}>
            Available
          </Badge>
        </HStack>
        <Box textAlign="center">
          <Link to={"/eventpage"}>
            <Button mt={3} color="black">Go to Event</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
