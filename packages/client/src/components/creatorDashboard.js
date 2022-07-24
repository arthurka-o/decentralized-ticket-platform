import React from "react";
import { Box, Heading, Button, Textarea, TableContainer, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";

const CreatorDashboard = (props) => {
  const { message, handleChange, handleMessageSent } = props;
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
                    <Td>5000</Td>
                </Tr>
                <Tr>
                    <Td>Tickets Available: </Td>
                    <Td>4337</Td>
                </Tr>
                <Tr>
                    <Td>Total Earnings: </Td>
                    <Td>50000</Td>
                </Tr>
            </Tbody>
        </Table>
    </TableContainer>
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
