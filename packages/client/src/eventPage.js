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


const EventPage = () => {
  const location = useLocation();
  const { event } = location.state;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isTicketHolder, setIsTicketHolder] = useState(false);
  const [eventAddress, setEventAddress] = useState("");

  let pathName = useLocation().pathname;
  const pathNumber = parseInt(/[0-9]+/.exec(pathName)[0]);

  useEffect(() => {
    getEventContractAddress();
  }, []);

  async function getEventContractAddress() {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(factoryAddress, Factory.abi, provider);
    const arrayOfContracts = await contract.allEvents();
    setEventAddress(arrayOfContracts[arrayOfContracts.length -1]);
  }
  
  async function determineUserStatus() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
  
    let contract = new ethers.Contract(eventAddress, EventNFT.abi, signer);
    const ownerAddress = await contract.creator();
    const hasTicket = parseInt(await contract.balanceOf(await signer.getAddress()));
  
    if (ownerAddress == signer.getAddress()) {
      setIsCreator(true);
    }
    if (hasTicket > 0) {
      setIsTicketHolder(true);
    }
    setIsLoggedIn(true);
  };
  
  async function buyTicket(price) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
  
    let contract = new ethers.Contract(eventAddress, EventNFT.abi, signer);
    const withSigner = contract.connect(signer);
    await withSigner.buyTicket({ value: ethers.utils.parseEther(price.toString()) });
    if (contract.balanceOf(await contract.balanceOf(await signer.getAddress())) > 1){
      return true;
    } else { return false };
  }

  const renderDashboard = () => {
    if (isCreator) {
      return <CreatorDashboard />;
    } else if (isTicketHolder) {
      return <TicketHolderDashboard />;
    } else {
      return (
        <Button onClick={() => {
          const isTicketBought = buyTicket(event.price);
          if (isTicketBought) {
            setIsTicketHolder(true)
          }
        } }>Buy Ticket</Button>
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
              <Button onClick={() => {
                determineUserStatus()
                console.log("here")
                }}>
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
