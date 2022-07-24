import React, { useState, useEffect } from "react";
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
import Web3Modal from "web3modal";
import EventNFT from "./abis/EventNFT.json";
import Factory from "./abis/Factory.json";
import { factoryAddress } from "./config/config";
import { ethers } from "ethers";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isTicketHolder, setIsTicketHolder] = useState(false);
  const [metadata, setMetadata] = useState("");
  const [creator, setCreator] = useState("");
  const [dashboardData, setDashboardData] = useState({});
  const { event } = useParams();

  useEffect(() => {
    getEventData();
    creatorDashboardData();
  }, []);

  async function creatorDashboardData() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(event, EventNFT.abi, provider);
    const totalTickets = parseInt((await contract.totalSupply())._hex);

    const allTicketHolders = await contract.getTicketHolders();

    const ticketsSold = allTicketHolders.length;
    const ticketsAvail = totalTickets - ticketsSold;
    const totalEarnings = ticketsSold * metadata.price;
    console.log(totalEarnings);

    setDashboardData(
      {
      ticketsSold: ticketsSold,
      ticketsAvail: ticketsAvail,
      totalEarnings: totalEarnings.toString(),
      allTicketHolders: allTicketHolders,
  });
  }

  async function getEventData() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(event, EventNFT.abi, provider);
    const creatorAddress = await contract.creator();
    const user = await provider.getSigner().getAddress();
    setCreator(creatorAddress);
    if (creator === user) {
      setIsCreator(true);
    }

    const ipfsLink = await contract.metadataUri();
    const httplink =
      ipfsLink.replace("ipfs://", "https://ipfs.io/ipfs/") + "/metadata.json";
    const data = await axios.get(httplink);
    setMetadata(data.data);
    console.log(data);
  }

  async function determineUserStatus() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const user = await signer.getAddress();

    let contract = new ethers.Contract(event, EventNFT.abi, signer);
    const hasTicket = parseInt(
      await contract.balanceOf(await signer.getAddress())
    );

    if (creator == user) {
      setIsCreator(true);
    }
    if (hasTicket > 0) {
      setIsTicketHolder(true);
    }
    setIsLoggedIn(true);
  }

  async function buyTicket(price) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(event, EventNFT.abi, signer);
    const withSigner = contract.connect(signer);
    console.log(
      "Address: " +
        ethers.utils.getAddress("0x8BCdC99F377ce10842bc12FB9585eA20F9733E93")
    );
    console.log(
      "Signer: " + (await contract.balanceOf(window.ethereum.selectedAddress))
    );
    await withSigner.buyTicket({
      value: ethers.utils.parseEther(price.toString()),
    });
    if ((await contract.balanceOf(await signer.getAddress())) > 0) {
      return true;
    } else {
      return false;
    }
  }

  const renderDashboard = () => {
    if (isCreator) {
      return <CreatorDashboard dashboardData={dashboardData} />;
    } else if (isTicketHolder) {
      return <TicketHolderDashboard />;
    } else {
      return (
        <Button
          onClick={async () => {
            const isTicketBought = await buyTicket(metadata.price);
            if (isTicketBought) {
              setIsTicketHolder(true);
            }
          }}
        >
          Buy Ticket
        </Button>
      );
    }
  };

  return (
    <SimpleGrid columns={2} spacing={0} gap={0} h="100vh">
      <VStack bg="gray.100" w="100%" textAlign="center" p={10}>
        <Image src={metadata.imgUrl} height="200px" />
        <VStack p={5}>
          <Heading as="h3" size="lg">
            {metadata.name}
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
                <Td>{metadata.datetime}</Td>
              </Tr>
              <Tr>
                <Td>Location: </Td>
                <Td>{metadata.city}</Td>
              </Tr>
              <Tr>
                <Td>Organiser: </Td>
                <Td>{creator}</Td>
              </Tr>
              <Tr>
                <Td>NFT Contract: </Td>
                <Td>{event}</Td>
              </Tr>
              <Tr whiteSpace="pre-wrap">
                <Td>Description: </Td>
                <Td>{metadata.description}</Td>
              </Tr>
              <Tr>
                <Td>Price: </Td>
                <Td>{metadata.price} ETH</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <VStack bg="gray.200" w="100%" p={10}>
        <Flex direction="row" justifyContent="flex-end" w="100%">
          {!isLoggedIn ? (
            <Box>
              <Button
                onClick={() => {
                  determineUserStatus();
                  console.log("here");
                }}
              >
                Connect Wallet
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
