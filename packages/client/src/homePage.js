import React, { useEffect, useState } from "react";
import { Button, Container, Box, Wrap, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "./components/card";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Factory from "../src/abis/Factory.json";
import { factoryAddress } from "./config/config";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(factoryAddress, Factory.abi, provider);
    const data = await contract.allEvents();
    console.log(data);
    setEvents(data);
  }

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
