import React from "react";
import { Box, Heading, Button, Text, TableContainer, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";

const CreatorDashboard = () => {
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
                    <Td>5000</Td>
                </Tr>
                <Tr>
                    <Td>Total Earnings: </Td>
                    <Td>50000</Td>
                </Tr>
            </Tbody>
        </Table>
    </TableContainer>
    <Button size="lg" mt={10}>Message Attendees</Button>

  </Box>;
};

export default CreatorDashboard;
