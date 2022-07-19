import React from "react";
import Header from "./components/header";
import { Container, Box } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <Container maxW="80%">
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;