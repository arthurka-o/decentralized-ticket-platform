import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Flex,
  Heading,
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
import CreatorDashboard from "./components/creatorDashboard";
import TicketHolderDashboard from "./components/ticketHolderDashboard";
import Web3Modal from "web3modal";
import EventNFT from "./abis/EventNFT.json";
import { Client } from '@xmtp/xmtp-js'
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

  //xmtp
  const [signer, setSigner] = useState(null);
  const [client, setClient] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, fetchMessages] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [message, setMessage] = useState("");
  const newMessages = useRef([]);

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

    if (creator === user) {
      setIsCreator(true);
    }
    if (hasTicket > 0) {
      setIsTicketHolder(true);
    }
    setSigner(signer)
    setIsLoggedIn(true);
  }

  async function buyTicket() {
    let contract = new ethers.Contract(event, EventNFT.abi, signer);
    const withSigner = contract.connect(signer);

    console.log(
      "Address: " +
        ethers.utils.getAddress("0x8BCdC99F377ce10842bc12FB9585eA20F9733E93")
    );
    console.log(
      "Signer: " + (await contract.balanceOf(window.ethereum.selectedAddress))
    );
    // await withSigner.buyTicket({
    //   value: ethers.utils.parseEther(price.toString()),
    // });
    // if ((await contract.balanceOf(await signer.getAddress())) > 0) {
    //   return true;

    const ticketTx = await withSigner.buyTicket({
      value: ethers.utils.parseEther(metadata.price.toString()),
    });
    await ticketTx.wait();
    const signerTicketBalance = await contract.balanceOf(await signer.getAddress());
    console.log(signerTicketBalance);
    if (signerTicketBalance) {
      setIsTicketHolder(true);
    } else {
      setIsTicketHolder(false);
    }

  }

  useEffect(() => {
    if (!newMessage) return;

    fetchMessages([...messages, newMessage]);
  }, [newMessage])
  //xmtp
  //listen to message stream
  useEffect(() => {
    if (!conversation) return;
    let stream;
    const listenToMessages = async () => {
      console.log('listening to conversation...')
      try {
        const stream = await conversation.streamMessages();
        for await (const message of stream) {
          if (message.senderAddress === client.address) {
            continue;
          }
          setNewMessage(message);
        }
      } catch (err) {
        stream = false;
        console.log(err);
      }
    }
    listenToMessages();
    return async () => {
      if (stream) {
        await stream.return();
      }
    }
  }, [conversation]);



  // event owner broadcast messages
  // initial handshake from tickerholder to event owner
  useEffect(() => {
    if (!client || !isTicketHolder)  return;
    const handShakeAndKeepAlive = async () => {
      // load convos
      const convos = await client.conversations.list();
      const convosWithCreator = convos.filter(({peerAddress}) => peerAddress === creator);
      // if no convos with creator
      let newConvo
      try {
        if (convosWithCreator.length === 0) {
          // create a new one
          newConvo = await client.conversations.newConversation(creator);
          console.log(creator);
          // initial handshake
          await newConvo.send('handshake');
        } else {
          // otherwise
          // load existing one
          newConvo = convosWithCreator[0];
          console.log(convosWithCreator);
        }
      } catch(err) {
        console.log(err);
      }
      const messages = await newConvo.messages();
      const messagesSentByCreator = messages.filter(({ senderAddress }) => senderAddress === creator);
      fetchMessages(messagesSentByCreator);
      setConversation(newConvo);
    }
    handShakeAndKeepAlive();
  }, [client])

  //xmtp connection
  useEffect(() => {
    if (!isCreator && !isTicketHolder) return;
    const connectToXMTP = async () => {
      try {
        const client = await Client.create(signer);
        setClient(client);
      } catch (err) {
        console.log(err);
      }
    };
    connectToXMTP();
  }, [isCreator, isTicketHolder]);

  //message form handling
  const handleMessageSent = async (e) => {
    e.preventDefault();
    const conversations = await client.conversations.list();
    if (isCreator && conversations.length > 0) {
      for (const conversation of conversations) {
        try {
          await conversation.send(message);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const renderDashboard = () => {
    if (isCreator) {
      return (
        <CreatorDashboard
          handleMessageSent={handleMessageSent}
          message={message}
          handleChange={handleChange}
          dashboardData={dashboardData}
        />
      )
    } else if (isTicketHolder) {
      return <TicketHolderDashboard messages={messages ? [...messages, ...newMessages.current]: []} />;
    } else {
      return (
        <Button
          onClick={buyTicket}
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
