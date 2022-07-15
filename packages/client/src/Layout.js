import React, { Component } from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

const Layout = (props) => {
  return (
    <Container width="60%">
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