import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box textAlign="center" mb={10} mt={5}>
      <Link to={"/"}>
        <Heading as="h2" color="black">Decentralised Ticket Platform</Heading>
      </Link>
    </Box>
  );
};

export default Header;
