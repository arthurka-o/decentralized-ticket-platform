import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Container,
  Textarea,
  Image,
  FormControl,
  FormLabel,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { factoryAddress, nftAddress } from "./config/config";
import Factory from "../src/abis/Factory.json";
import { NFTStorage } from "nft.storage";
import { useNavigate } from "react-router-dom";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const NewEvent = () => {
  const [fileUrl, setFileUrl] = useState("");
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    datetime: "",
    city: "",
    venue: "",
    price: "",
    supply: "",
  });
  
  const navigate = useNavigate();

  async function metadataNFT() {
    const NFT_STORAGE_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM4ZkIzMjREYmRBM0E3ZEI4NzcxNWZiODMwQzcwN0Q1OUU5RGZCREEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODU3Mzc3NjU2NiwibmFtZSI6IlRpY2tldFBsYXRmb3JtIn0.VbIeku0jvn2FnjuqGBvAImyp5ziQt4duXUgA4kDhTpA";
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    let jsonObject = {
      name: formInput.name,
      datetime: formInput.datetime,
      city: formInput.city,
      description: formInput.description,
      supply: formInput.supply,
      price: formInput.price,
      imgUrl: fileUrl
    };

    jsonObject = new File([JSON.stringify(jsonObject)], "metadata.json", {
      type: "text/json",
    });

    const metadata = await client.storeDirectory([jsonObject]);
    return metadata;
  }

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      console.log(added.path);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      setFileUrl(url);
    } catch (e) {
      console.log(e);
    }
  }

  const createEvent = async (uri) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    let contract = new ethers.Contract(factoryAddress, Factory.abi, signer);
    const newEvent = await contract.createEvent(formInput.supply, price, uri);
    navigate("/");
  };

  return (
    <Container>
      <Heading as="h3" size="md">
        Create an Event
      </Heading>
      <FormLabel>Event Name</FormLabel>
      <Input
        value={formInput.name}
        onChange={(event) =>
          setFormInput({ ...formInput, name: event.target.value })
        }
        id="name"
      />
      <FormLabel>Date and Time</FormLabel>
      <Input
        placeHolder="Select Date and Time"
        size="md"
        backgroundColor="#ffffff"
        type="datetime-local"
        id="datetime"
        onChange={(event) =>
          setFormInput({ ...formInput, datetime: event.target.value })
        }
      />
      <FormLabel>Location</FormLabel>
      <Input
        value={formInput.city}
        onChange={(event) =>
          setFormInput({ ...formInput, city: event.target.value })
        }
      ></Input>
      <FormLabel>Description</FormLabel>
      <Textarea
        value={formInput.description}
        onChange={(event) =>
          setFormInput({ ...formInput, description: event.target.value })
        }
        id="description"
      />
      <FormLabel>Ticket Supply</FormLabel>
      <Input
        value={formInput.ticketSupply}
        onChange={(event) =>
          setFormInput({ ...formInput, supply: event.target.value })
        }
        id="ticketSupply"
      />
      <FormLabel>Ticket Price</FormLabel>
      <InputGroup>
        <InputLeftAddon>ETH</InputLeftAddon>
        <Input
          label="ETH"
          labelPosition="left"
          value={formInput.price}
          onChange={(event) =>
            setFormInput({ ...formInput, price: event.target.value })
          }
          id="price"
        />
      </InputGroup>
      <FormLabel>Event Image</FormLabel>
      <Input type="file" name="Asset" onChange={onChange} />
      {fileUrl && <Image src={fileUrl} maxW="250px" />}
      <Box textAlign="center" mt={10}>
        <Button
          size="lg"
          colorScheme="blue"
          onClick={async () => {
            const metadata = await metadataNFT();
            createEvent("ipfs://" + metadata);
          }}
        >
          Create Event
        </Button>
      </Box>
    </Container>
  );
};

export default NewEvent;
