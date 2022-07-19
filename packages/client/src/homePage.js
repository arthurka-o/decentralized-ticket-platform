import React, { Component } from "react";
import { Button, Container, Box, Wrap, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "./components/card";

const HomePage = () => {
  const events = [
    {
      id: 1,
      name: "UEFA Champions League Final",
      description:
        "Morbi dui augue, varius ac ultricies a, tempor eget diam. Mauris blandit commodo pretium. Proin ut feugiat felis. Morbi lacinia augue tellus, in imperdiet leo egestas egestas. Morbi vestibulum luctus massa non semper. Aliquam dignissim purus arcu, sit amet convallis tortor pharetra in. Nam a egestas lorem. Quisque porttitor mollis pulvinar.",
      datetime: "25/8/2022 20:00",
      city: "Madrid",
      venue: "Estadio Bernabeu",
      price: 500,
      imageUrl: "https://www.bt.com/content/dam/bt/portal/images/articles/sport/football/ucl_htw_1305.jpg",
      organiser: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
      NFTcontract: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      id: 2,
      name: "Guns n Roses Concert",
      description: "Morbi dui augue, varius ac ultricies a, tempor eget diam. Mauris blandit commodo pretium. Proin ut feugiat felis. Morbi lacinia augue tellus, in imperdiet leo egestas egestas. Morbi vestibulum luctus massa non semper. Aliquam dignissim purus arcu, sit amet convallis tortor pharetra in. Nam a egestas lorem. Quisque porttitor mollis pulvinar.",
      datetime: "30/2/2024 21:00",
      city: "New York",
      venue: "Madison Square Garden",
      price: 100,
      imageUrl: "https://oor.nl/media/2016/04/1431091913.guns_-1024x683.jpg",
      organiser: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
      NFTcontract: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
    {
      id: 3,
      name: "Solidity Developer Summit",
      description: "Morbi dui augue, varius ac ultricies a, tempor eget diam. Mauris blandit commodo pretium. Proin ut feugiat felis. Morbi lacinia augue tellus, in imperdiet leo egestas egestas. Morbi vestibulum luctus massa non semper. Aliquam dignissim purus arcu, sit amet convallis tortor pharetra in. Nam a egestas lorem. Quisque porttitor mollis pulvinar.",
      datetime: "31/12/2022 8:00",
      city: "London",
      venue: "Alexandra Palace",
      price: 40,
      imageUrl: "https://imageio.forbes.com/specials-images/imageserve/609c5c514fddca80f735a62f/Vitalik-Buterin--Ethereum-s-co-founder/960x0.jpg?format=jpg&width=960",
      organiser: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
      NFTcontract: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    },
  ];

  const renderEvents = () => {
    const items = events.map((event) => {
      return <Card event={event} />;
    });

    return items;
  };
  return (
    <Container centerContent>
      <h3>Current Events</h3>
      <Box w="1000px">
        <Stack direction="row" justifyContent="center">
          <Wrap>{renderEvents()}</Wrap>
        </Stack>
      </Box>
      <Link to={"/new"}>
        <Button my={5} size="lg" colorScheme="blue">
          Create New Event
        </Button>
      </Link>
    </Container>
  );
};

export default HomePage;