import React, { useState, useEffect } from 'react';
import { Center, Text, Box, HStack, Stack, Heading } from 'native-base'
import { VictoryPie, VictoryTheme } from "victory-native";


const BloodO2Card = () => {
    const [bloodO2Count, setBloodO2Count] = useState(0)
    const [stepGoal, setStepGoal] = useState(-1)

    useEffect(() => {
        setBloodO2Count(98)
        setStepGoal(10000)
    }, [])

    return (
        <Box width="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Stack p="4" height="100%" justifyContent='center'>
                <Stack space={2}>
                    <Heading size="md">
                        Blood Oxygen
                    </Heading>
                </Stack>

                <Center h={90} w='100%'>
                    <Text fontSize='sm' mt={45} position='absolute'>
                        {bloodO2Count}%
                    </Text>
                    <VictoryPie
                        width={90}
                        height={90}
                        innerRadius={25}
                        radius={40}
                        colorScale={['lightgreen', 'lightgray']}
                        theme={VictoryTheme.material}
                        animate={{
                            duration: 2000,
                            onEnter: {
                                duration: 200,
                                easing: 'exp'
                            }
                        }}
                        data={[bloodO2Count, 100 - bloodO2Count]}
                        labels={[]} />
                </Center>
            </Stack>
            <Box>
            </Box>
        </Box>
    )
};

export default BloodO2Card