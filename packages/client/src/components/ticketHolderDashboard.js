import { Box, Heading, Button, Text } from "@chakra-ui/react";

const TicketHolderDashboard = () => {
  return (
    <Box textAlign="center">
      <Heading>Ticket Holder Dashboard</Heading>
      <Text>Latest Updates:</Text>
      <Text>Amount of tickets owned: 1</Text>
      <Button>Message Organiser</Button>
    </Box>
  );
};

export default TicketHolderDashboard;
