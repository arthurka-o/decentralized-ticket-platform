import { Box, Text } from "@chakra-ui/react";

const Message = (props) => {
  const { content, timestamp } = props;

  return (
    <Box bg='white' borderRadius="10" p="4">
      <Text>{content}</Text>
      <Text float="right" fontSize="10">{timestamp.toLocaleString()}</Text>
    </Box>
  );
};

export default Message;
