import React from "react";
import { Box, Heading, Button, Text, TableContainer, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";

const CreatorDashboard = (dashboardData) => {
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
                    <Td>{dashboardData[0]}</Td>
                </Tr>
                <Tr>
                    <Td>Tickets Available: </Td>
                    <Td>{dashboardData[1]}</Td>
                </Tr>
                <Tr>
                    <Td>Total Earnings (in Matic): </Td>
                    <Td>{dashboardData[2]}</Td>
                </Tr>
                <Tr>
                    <Td>All Ticket Owner Addresses: </Td>

                </Tr>
            </Tbody>
        </Table>
    </TableContainer>
    <Button size="lg" mt={10}>Message Attendees</Button>

  </Box>;
};

export default CreatorDashboard;
