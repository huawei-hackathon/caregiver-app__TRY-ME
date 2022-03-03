import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Heading, Text, Pressable, Box, Center, HStack, VStack } from 'native-base'

import ChartComponent from './Chart';
import { dateToDaysAndTime, dateToStr, dateToTime } from '../../../../utils';

const TabBar = ({ nav, position, setPos }) => {
    return (
        <Box flexDirection="row" bg='gray.200' h='30px' borderRadius={5}>
            {
                nav.map((name, i) => {
                    return (
                        <Box
                            flex={1}
                            bg={(position === i) ? 'white' : 'gray.200'}
                            borderRadius={5}
                        >
                            <Box
                                flex={1}
                                alignItems="center"
                                justifyContent='center'
                                my={2}
                                borderRightWidth='0.5px'
                                borderRightColor='gray.400'
                                id={i}
                                key={`key-${i}`}>
                                <Pressable
                                    w='100%'
                                    h='100%'
                                    flex={1}
                                    alignItems="center"
                                    justifyContent='center'
                                    onPress={() => {
                                        console.log('press', i)
                                        setPos(i)
                                    }}>
                                    <Text
                                        fontSize='2xs'>
                                        {name}
                                    </Text>
                                </Pressable>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

const getData = ({ type }) => {
    console.log('type', type)
    let total = 0
    let data = []

    if (type === 'D') {
        let val
        for (let i = 0; i < 24; i++) {
            val = Math.round(Math.random() * 100 + 50)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        return {
            data,
            tickValues: [0, 6, 12, 18, 23],
            theme: {
                labels: {
                    formatter: (v) => v.toFixed(2)
                }
            },
            average: total / 24,
        }
    }
    else if (type === 'W') {
        for (let i = 0; i < 7; i++) {
            val = Math.round(Math.random() * 100 + 50)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

        return {
            data,
            tickValues: [0, 3, 6],
            theme: {
                formatter: (d) => dayArr[d]
            },
            average: total / 7,
        }
    }
    else if (type === 'M') {
        for (let i = 1; i <= 31; i++) {
            val = Math.round(Math.random() * 100 + 50)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        return {
            data,
            tickValues: [1, 15, 30],
            average: total / 31,

        }
    }
    else if (type === 'Y') {
        for (let i = 0; i < 12; i++) {
            val = Math.round(Math.random() * 100 + 50)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        const monArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


        return {
            data,
            tickValues: [1, 6, 12],
            theme: {
                formatter: (m) => monArr[m]
            },
            average: total / 12,
        }
    }
}


const navObjs = ['D', 'W', 'M', 'Y']

let HeartRatePage = () => {
    const pageMap = ["D", "W", "M", "Y"]
    const [page, setPage] = useState(0)
    const [tickValues, setTickValues] = useState([])
    const [chartData, setChartData] = useState([])
    const [averageBpm, setAverageBpm] = useState(-1)
    const [theme, setTheme] = useState({})

    const [lastUpdate, setLastUpdate] = useState('')
    const [lastUpdateVal, setLastUpdateVal] = useState('')

    useEffect(() => {
        let dataObj = getData({ type: pageMap[page] })

        setTickValues(dataObj['tickValues'])
        setChartData(dataObj['data'])
        setTheme(dataObj['theme'])
        setAverageBpm(Math.round(dataObj['average']))

        const d = new Date()
        setLastUpdate(dateToTime(d))
        setLastUpdateVal(54)

    }, [page])

    return (
        <Center>
            <VStack mx={5} my={5}>
                <Box mx={3}>
                    <TabBar
                        nav={navObjs}
                        position={page}
                        setPos={(x) => { setPage(x) }}
                    />
                </Box>

                <VStack pl={3}>
                    <Text bold pt={3} color='gray.400'>AVERAGE</Text>
                    <HStack alignItems='center'>
                        <Heading>{averageBpm}</Heading>
                        <Text bold pl={1} color='gray.400'>bpm</Text>
                    </HStack>
                </VStack>


                <ChartComponent
                    chartData={chartData}
                    tickValues={tickValues}
                    theme={theme} />

                <Box m={5} p={4} bg="gray.200" borderRadius={10}>
                    <HStack justifyContent='space-between'>
                        <Text>Latest update: {lastUpdate}</Text>
                        <Text>
                            <Text bold>{lastUpdateVal} </Text>
                            BPM
                        </Text>
                    </HStack>
                </Box>
            </VStack>
        </Center >
    )
}

export default HeartRatePage