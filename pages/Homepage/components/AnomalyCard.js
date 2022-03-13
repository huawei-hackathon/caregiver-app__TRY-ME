import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  Center,
  HStack,
  Spinner,
  Image,
  Stack,
  Heading,
  Badge,
} from "native-base";

const AnomalyCard = () => {
  return (
    <Box alignItems="center" width="100%">
      <Box
        width="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        py={4}
        px={3}
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Stack>
          <Heading size="md">Anomalies⚠️</Heading>

          <Box mt={3}>
            <Text>No anomalies found.</Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AnomalyCard;
