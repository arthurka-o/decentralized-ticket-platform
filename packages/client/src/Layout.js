import React from "react";
import Header from "./components/header";
import { Container, Box } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <Container maxW="80%">
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        ></link>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;