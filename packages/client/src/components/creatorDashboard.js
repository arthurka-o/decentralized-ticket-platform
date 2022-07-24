import React from "react";

import {
  Box,
  Heading,
  Button,
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  UnorderedList,
  ListItem,
  Textarea
} from "@chakra-ui/react";

const CreatorDashboard = (props) => {
  const { message, handleChange, handleMessageSent, dashboardData } = props;
  return <Box mt={5} textAlign="center">
    <Heading>Creator Dashboard</Heading>
    <TableContainer>

        <Table>
          <Thead>
            <Tr>
              <Th>Event Metrics</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Tickets Sold: </Td>
              <Td>{dashboardData.ticketsSold}</Td>
            </Tr>
            <Tr>
              <Td>Tickets Available: </Td>
              <Td>{dashboardData.ticketsAvail}</Td>
            </Tr>
            <Tr>
              <Td>Total Earnings (in Matic): </Td>
              <Td>{dashboardData.totalEarnings}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Text>Ticket Owner Addresses</Text>
      <UnorderedList>
        {dashboardData.allTicketHolders.map((holder) => {
            return (
                <ListItem>{holder}</ListItem>
            )
        })}
      </UnorderedList>
      <Button size="lg" mt={10}>
        Message Attendees
      </Button>



    <Textarea
      placeholder="Type your message here"
      mt="10"
      background="white"
      value={message}
      onChange={handleChange}
    />

    <Button size="lg" mt={3} onClick={handleMessageSent}>Message Attendees</Button>

  </Box>;
};

export default CreatorDashboard;
