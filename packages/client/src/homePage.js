import React, { Component } from "react";
import { Button, Container, Box, Wrap, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "./components/card";

const HomePage = () => {
  const events = [
    {
      name: "UEFA Champions League Final 2023",
      description: "blablabla",
    },
    {
      name: "Guns n Roses concert",
      description: "dummy text",
    },
    { name: "Another event", description: "Hello World" },
  ];

  const renderEvents = () => {
    const items = events.map((event) => {
      return (
        <Card />
      );
    });

    return items;
  };
  return (
    <Container centerContent>
      <h3>Current Events</h3>
      <Box w="1000px">
        <Stack direction="row" justifyContent="center">
        <Wrap>
      {renderEvents()}
      </Wrap>
      </Stack>
      </Box>
      <Link to={"/new"}>
      <Button my={5} size="lg" colorScheme="blue">Create New Event</Button>
      </Link>
    </Container>
  );
};

export default HomePage;
