import React from "react";
import { Alert, VStack, HStack, IconButton, CloseIcon, Box, Text, Center, NativeBaseProvider } from "native-base";

function SuccessAlert({ title, msg, setIsShown }) {
    return (
        <Box
            justifyContent='center'
            alignItems='center'
        >
            <Alert w="90%" maxW="400" status="success" colorScheme="success"
                position='absolute'
                top='-350px'>
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                {title}
                            </Text>
                        </HStack>
                        <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" onPress={() => { setIsShown(false) }} />} />
                    </HStack>
                    <Box pl="6" _text={{
                        color: "coolGray.600"
                    }}>
                        {msg}
                    </Box>
                </VStack>
            </Alert>
        </Box>
    )
}

export default SuccessAlert
