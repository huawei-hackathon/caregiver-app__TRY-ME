import React from "react"
import {
    Alert,
    VStack,
    HStack,
    IconButton,
    CloseIcon,
    Box,
    Text,
    Center,
    Collapse,
    Button
} from "native-base"
export function ErrorModal(props) {
    let setShow = props.setModalShow
    let show = props.show

    console.log(show)
    return (
        <Box w="100%" position='absolute' top="-30px">
            <Collapse isOpen={show}>
                <Alert w="100%" status="error">
                    <VStack space={1} flexShrink={1} w="100%">
                        <HStack
                            flexShrink={1}
                            space={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text
                                    fontSize="md"
                                    fontWeight="medium"
                                    _dark={{
                                        color: "coolGray.800",
                                    }}
                                >
                                    {props.errMsg}
                                </Text>
                            </HStack>
                            <IconButton
                                variant="unstyled"
                                icon={<CloseIcon size="3" color="coolGray.600" />}
                                onPress={() => setShow(false)}
                            />
                        </HStack>
                        <Box
                            pl="6"
                            _dark={{
                                _text: {
                                    color: "coolGray.600",
                                },
                            }}
                        >
                            {props.errDesc}
                        </Box>
                    </VStack>
                </Alert>
            </Collapse>
        </Box>
    )
}

export default ErrorModal