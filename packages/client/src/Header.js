import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
        <a className="item">Decentralised Ticketing Platform</a>
      <Menu.Menu position="right">
        <a className="item">Events</a>
        <a className="item">+</a>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
