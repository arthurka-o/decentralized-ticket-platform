import React from "react";
import { Button, Card, Grid, Container } from "semantic-ui-react";

const EventPage = () => {

  const renderCards = () => {

    const items = [
      {
        header: "0xa43e63ab....bb66",
        meta: "Event Creator",
        description:
          "The owner of this address created this event",
        style: { overflowWrap: "break-word" },
      },
      {
        header: 10,
        meta: "Ticket price (ETH)",
        description: "The amount needed to pay for a ticket"
   },
      {
        header: 8340,
        meta: "Number of Tickets Available",
        description:
          "A request tries to withdraw money from the contract. Reuqests must be approved",
      },
      {
        header: 2301,
        meta: "Number of tickets sold",
        description:
          "The amount of people that have contributed to the campaign",
      },
      {
        header: 83400,
        meta: "Total earnings",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ];

    return <Card.Group items={items} />;
  }

  return (
    <Container>
      <h3>UEFA Champions League final 2023</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
              <a>
                <Button primary>Buy Ticket</Button>
              </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
  );
}

export default EventPage;