import React, { Component } from "react";
import { Card, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const events = [
    {
      name: "UEFA Champions League Final 2023",
      description: "blablabla",
    },
    {
      name: "Guns n Roses concert",
      description: "dummy text",
    },
    { name: "Another event", description: "Hello World" },
  ];

  const renderEvents = () => {
    const items = events.map((event) => {
      return {
        header: event.name,
        description: event.description,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };
  return (
    <Container>
      <h3>Current Events</h3>
      <a>
        <Link to={"/new"}>
          <Button
            floated="right"
            content="Create Event"
            icon="add circle"
            primary
            labelPosition="left"
          />
        </Link>
      </a>
      {renderEvents()}
    </Container>
  );
};

export default HomePage;
