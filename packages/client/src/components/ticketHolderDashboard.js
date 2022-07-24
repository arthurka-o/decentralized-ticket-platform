import { Box, Heading, VStack, StackDivider} from "@chakra-ui/react";
import Message from "./message";

const TicketHolderDashboard = (props) => {
  const { messages } = props;
  console.log({messages})
  return (
    <Box width="100%">
      <Box textAlign="center" mt="5">
        <Heading>Announcements</Heading>
      </Box>
      <VStack
        divider={<StackDivider borderColor='white' />}
        spacing={4}
        mt="5"
        align='stretch'
      >
        {messages.map(({sent, content}, i) => (<Message timestamp={sent} key={i} content={content}></Message>))}
      </VStack>
    </Box>
  );
};

export default TicketHolderDashboard;
