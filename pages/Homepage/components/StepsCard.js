import React, { useState, useEffect } from 'react';
import { Badge, Center, Text, Box, HStack, Stack, Heading } from 'native-base'
import { VictoryBar } from 'victory-native';


const StepsCard = () => {
    const [stepCount, setStepCount] = useState(0)
    const [stepGoal, setStepGoal] = useState(0)
    const [badgeColor, setBadgeColor] = useState('')

    useEffect(() => {
        setStepGoal(10000)
        setTimeout(() => {
            setStepCount(4000)
        }, 100)
    }, [])

    useEffect(() => {
        console.log(stepCount, stepGoal / 24 * new Date().getHours())

        // Set healthy step count or unhealthy step count
        if ((stepCount < stepGoal / 24 * new Date().getHours())) {
            if ((stepCount + 1000 >= stepGoal / 24 * new Date().getHours())) {

                setBadgeColor("#F8E948") // in progress
                return
            }

            setBadgeColor('#F04F4F') // danger
        } else {
            setBadgeColor('lightgreen') // complete
        }
    }, [stepCount])

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
            <Stack p="4" space={3} height="100%" justifyContent='center'>
                <Stack space={2}>
                    <Heading size="md" >
                        Step count👣
                    </Heading>
                    <HStack alignItems="center" space={1}>
                        <Text bold fontSize="lg">{`${stepCount}`}</Text>
                        <Text>steps</Text>
                    </HStack>

                    {/* <Badge colorScheme={badgeColor} width='100px'></Badge> */}
                </Stack>

                <HStack my={2} alignItems="center" space={4} justifyContent="space-between">
                    <Center flex={1}>
                        <Text
                            style={{
                                position: 'absolute',
                                top: -20,
                                right: -10,
                            }}
                            fontSize='xs'
                            color='gray.500'
                        >
                            /{stepGoal}
                        </Text>
                        <VictoryBar
                            width={150}
                            height={30}
                            barWidth={30}
                            barRatio={0}
                            alignment='end'
                            padding={{
                                top: 0,
                            }}
                            data={[{ x: 1, y: stepCount }]}
                            style={{
                                data: {
                                    fill: badgeColor,
                                },
                                parent: {
                                    backgroundColor: 'lightgray',
                                }
                            }}
                            domain={{ x: [0, 1], y: [0, stepGoal] }}
                            animate={{
                                onEnter: {
                                    duration: 50,
                                    easing: 'exp'
                                }
                            }}
                            horizontal
                        />
                    </Center>
                </HStack>
            </Stack>
        </Box >
    )
};

export default StepsCard