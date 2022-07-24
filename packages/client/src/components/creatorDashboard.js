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
} from "@chakra-ui/react";

const CreatorDashboard = (props) => {
  const { dashboardData } = props;
  return (
    <Box mt={5} textAlign="center">
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
            <Tr>
              <Td>All Ticket Owner Addresses: </Td>
              <Td>{dashboardData.allTicketHolders}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Button size="lg" mt={10}>
        Message Attendees
      </Button>
    </Box>
  );
};

export default CreatorDashboard;
