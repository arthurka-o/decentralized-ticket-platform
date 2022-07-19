import React, { useState } from "react";
import {
  Button,
  Container,
  Flex,
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
  TableContainer,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";
import CreatorDashboard from "./components/creatorDashboard";
import TicketHolderDashboard from "./components/ticketHolderDashboard";

const EventPage = () => {
  const location = useLocation();
  const { event } = location.state;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isTicketHolder, setIsTicketHolder] = useState(false);

  const renderDashboard = () => {
    if (isCreator) {
      return <CreatorDashboard />;
    } else if (isTicketHolder) {
      return <TicketHolderDashboard />;
    } else {
      return (
        <Button onClick={() => setIsTicketHolder(true)}>Buy Ticket</Button>
      );
    }
  };

  return (
    <SimpleGrid columns={2} spacing={0} gap={0} h="100vh">
      <VStack bg="gray.100" w="100%" textAlign="center" p={10}>
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
                <Td>
                  {event.venue}, {event.city}
                </Td>
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
      </VStack>

      <VStack bg="gray.200" w="100%" p={10}>
        <Flex direction="row" justifyContent="flex-end" w="100%">
          {!isLoggedIn ? (
            <Box>
              <Button onClick={() => setIsLoggedIn(true)}>
                Connect Wallet
              </Button>
              <Button
                onClick={() => {
                  setIsLoggedIn(true);
                  setIsCreator(true);
                }}
              >
                Creator Login
              </Button>
            </Box>
          ) : (
            <Button
              onClick={() => {
                setIsLoggedIn(false);
                setIsCreator(false);
                setIsTicketHolder(false);
              }}
            >
              Logout
            </Button>
          )}
        </Flex>

        {isLoggedIn ? renderDashboard() : ""}
      </VStack>
    </SimpleGrid>
  );
};

export default EventPage;
