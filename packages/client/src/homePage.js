import React, { useEffect, useState } from "react";
import { Button, Container, Box, Wrap, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "./components/card";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Factory from "../src/abis/Factory.json";
import EventNFT from "../src/abis/EventNFT.json";
import { factoryAddress } from "./config/config";
import axios from "axios";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const factoryContract = new ethers.Contract(
      factoryAddress,
      Factory.abi,
      provider
    );
    const data = await factoryContract.allEvents();

    const items = await Promise.all(
      data.map(async (event) => {
        let nftContract = new ethers.Contract(event, EventNFT.abi, provider);
        let ipfsLink = await nftContract.metadataUri();
        let httplink = ipfsLink.replace("ipfs://", "https://ipfs.io/ipfs/") + "/metadata.json";
        console.log(httplink);
        let metadata = await axios.get(httplink);
        console.log(metadata);
        let item = {
          name: metadata.data.name,
          datetime: metadata.data.datetime,
          price: metadata.data.price,
          address: event,
          imgUrl: metadata.data.imgUrl,
          city: metadata.data.city
        };
        return item;
      })
    );
    setEvents(items);
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
