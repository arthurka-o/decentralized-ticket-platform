import React from "react";
import {
  Button,
  Container,
  Image,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Photo from "./clfinal.jpg";

const EventPage = () => {
  const items = [
    {
      header: "0xa43e63ab....bb66",
      meta: "Event Creator",
      description: "The owner of this address created this event",
      style: { overflowWrap: "break-word" },
    },
    {
      header: 10,
      meta: "Ticket price (ETH)",
      description: "The amount needed to pay for a ticket",
    },
    {
      header: 8340,
      meta: "Number of Tickets Available",
      description:
        "A request tries to withdraw money from the contract. Reuqests must be approved",
    },
    {
      header: 2301,
      meta: "Number of tickets sold",
      description: "The amount of people that have contributed to the campaign",
    },
    {
      header: 83400,
      meta: "Total earnings",
      description:
        "The balance is how much money this campaign has left to spend",
    },
  ];

  return (
    <Container centerContent maxW="600px">
      <Image src={Photo} height="200px" />
      <VStack p={5}>
        <Heading as="h3" size="lg">
          UEFA Champions League final 2023
        </Heading>
        <Heading as="h4" size="md">
          25 August 2022 &bull; 20:00
        </Heading>
      </VStack>
      <Text>
        Morbi dui augue, varius ac ultricies a, tempor eget diam. Mauris blandit
        commodo pretium. Proin ut feugiat felis. Morbi lacinia augue tellus, in
        imperdiet leo egestas egestas. Morbi vestibulum luctus massa non semper.
        Aliquam dignissim purus arcu, sit amet convallis tortor pharetra in. Nam
        a egestas lorem.
      </Text>

      <Button size="lg" mt={5}>
        Buy Ticket
      </Button>
    </Container>
  );
};

export default EventPage;
