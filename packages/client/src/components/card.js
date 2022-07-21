import { Box, Button, Image, Badge, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { event } = props;

  return (
    <Box
      w="300px"
      rounded="20px"
      boxShadow="sm"
      bg="gray.200"
      overflow="hidden"
    >
      <Image src={event.imageUrl} h="200px" />
      <Box p={5}>
        <HStack align="baseline" justify="space-between">
          <Text
            textTransform="uppercase"
            fontSize="sm"
            color="gray.500"
            letterSpacing="wide"
          >
            {event.datetime}
          </Text>
          <Text
            textTransform="uppercase"
            fontSize="sm"
            color="gray.500"
            letterSpacing="wide"
          >
            {event.city}
          </Text>
        </HStack>
        <Text as="h2" fontWeight="semibold" fontSize="xl" my={2}>
          {event.name}
        </Text>
        <Text fontWeight="light" fontSize="md" noOfLines={3}>
          {event.description}
        </Text>
        <HStack align="baseline" justify="space-between">
          <Text fontWeight="semibold" fontSize="lg">
            {event.price} ETH
          </Text>
          <Badge variant="solid" rounded="full" colorScheme="green" px={2}>
            Available
          </Badge>
        </HStack>
        <Box textAlign="center">
          <Link to={"/events/" + event.id} state={{ event: event }}>
            <Button mt={3} color="black" colorScheme="gray" boxShadow="md">
              Go To Event
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
