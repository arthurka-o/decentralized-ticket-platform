import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Flex justifyContent="center" mb={10} mt={5} w="100%">
      <Link to={"/"}>
        <Heading as="h2" color="black">Decentralised Ticket Platform</Heading>
      </Link>
    </Flex>
  );
};

export default Header;
