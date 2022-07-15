import React, {useState} from "react";
import { Form, Button, Input, Container, TextArea } from "semantic-ui-react";

const NewEvent = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    price: "",
    supply: ""
  });

    return (
      <Container>
        <h3>Create an Event</h3>
        <Form>
          <Form.Field>
            <label>Event Name</label>
            <Input value={formInput.name} onChange={(event) =>setFormInput({ ...formInput, name: event.target.value})} id="name"
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <TextArea value={formInput.description} onChange={(event) =>setFormInput({ ...formInput, description: event.target.value})} id="description"
            />
          </Form.Field>
          <Form.Field>
            <label>Amount of Tickets</label>
            <Input value={formInput.ticketSupply} onChange={(event) =>setFormInput({ ...formInput, supply: event.target.value})} id="ticketSupply"
            />
          </Form.Field>
          <Form.Field>
            <label>Ticket Price</label>
            <Input
              label="ETH"
              labelPosition="left"
              value={formInput.price} onChange={(event) =>setFormInput({ ...formInput, price: event.target.value})} id="price"
            />
          </Form.Field>
          <Button primary>
            Create Event
          </Button>
        </Form>
      </Container>
    );
  }

export default NewEvent;
