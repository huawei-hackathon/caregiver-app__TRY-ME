import React, { useState, useEffect } from 'react';
import { Badge, Center, Text, Box, HStack, Stack, Heading } from 'native-base'
import { VictoryPie, VictoryTheme } from 'victory-native';


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
            <Stack p="4" height="100%" justifyContent='space-between'>
                <Stack>
                    <Heading size="md">
                        Steps Count
                    </Heading>
                </Stack>

                <Center h="90%" w='100%'>
                    <Text fontSize='md' mt={45} position='absolute' bold>
                        {stepCount}
                    </Text>
                    <VictoryPie
                        innerRadius={35}
                        radius={55}
                        colorScale={[badgeColor, 'lightgray']}
                        theme={VictoryTheme.material}
                        animate={{
                            duration: 4000,
                            onEnter: {
                                duration: 4000,
                                easing: 'exp'
                            }
                        }}
                        data={[stepCount, stepGoal - stepCount]}
                        labels={[]} />
                </Center>
            </Stack>
            {/* <Stack p="4" space={3} height="100%" justifyContent='space-between '>
                <Stack space={2}>
                    <Heading size="md" >
                        Step count
                    </Heading>
                    <Badge colorScheme={badgeColor} width='100px'>{`${stepCount} steps`}</Badge>
                </Stack>

                <HStack my={2} alignItems="center" space={4} justifyContent="space-between">
                    <Center flex={1}>
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
                                    fill: "lightgreen",
                                },
                                parent: {
                                    backgroundColor: 'lightgray',
                                }
                            }}
                            domain={{ x: [0, 1], y: [0, stepGoal] }}
                            animate={{
                                duration: 2000,
                                onEnter: {
                                    duration: 200,
                                    easing: 'exp'
                                }
                            }}
                            horizontal
                        />
                    </Center>
                </HStack>
            </Stack> */}
        </Box>
    )
};

export default StepsCard