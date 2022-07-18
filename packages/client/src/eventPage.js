import React from "react";
import {
  Button,
  Container,
  Image,
  Heading,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  TableContainer
} from "@chakra-ui/react";
import Photo from "./clfinal.jpg";
import { useLocation, Link } from "react-router-dom";

const EventPage = () => {
  const location = useLocation();
  const { event } = location.state;

  return (
    <Container centerContent maxW="600px">
      <Image src={event.imageUrl} height="200px" />
      <VStack p={5}>
        <Heading as="h3" size="lg">
          {event.name}
        </Heading>
      </VStack>
      <TableContainer>
        <Table size="lg">
        <Thead>
          <Tr>
            <Th>Event Details</Th>
            <Th></Th>
            </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Date and Time: </Td>
            <Td>{event.datetime}</Td>
          </Tr>
          <Tr>
            <Td>Location: </Td>
            <Td>{event.venue}, {event.city}</Td>
          </Tr>
          <Tr>
            <Td>Organiser: </Td>
            <Td>{event.organiser}</Td>
          </Tr>
          <Tr>
            <Td>NFT Contract: </Td>
            <Td>{event.NFTcontract}</Td>
          </Tr>
          <Tr whiteSpace="pre-wrap">
            <Td>Description: </Td>
            <Td>{event.description}</Td>
          </Tr>
          <Tr>
            <Td>Price: </Td>
            <Td>{event.price} ETH</Td>
          </Tr>
        </Tbody>

        </Table>
      </TableContainer>


      <Button size="lg" mt={5}>
        Buy Ticket
      </Button>
    </Container>
  );
};

export default EventPage;
