import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Heading, Text, Pressable, Box, Center, HStack, VStack } from 'native-base'

import ChartComponent from './chart';
import { dateToDaysAndTime, getCategories, getTickVal, getData } from '../../../utils';
import { connect, useStore } from 'react-redux';

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
                                key={`key2-${i}`}>
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

const getMockData = (type) => {
    console.log('type', type)
    let total = 0
    let data = []
    let val

    if (type === 'W') {
        for (let i = 0; i < 7; i++) {
            val = Math.round(Math.random() * 10000 + 20000)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

        return {
            data,
            categories: dayArr,
            stepDisp: total / 7,
            tickValues: [0, 1, 2, 3, 4, 5, 6,]
        }
    }
    else if (type === 'M') {
        let categories = []

        for (let i = 0; i < 31; i++) {
            categories.push(i + 1)
            val = Math.round(Math.random() * 10000 + 20000)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        return {
            data,
            categories,
            stepDisp: total / 31,
            tickValues: [0, 9, 19, 29]
        }
    }
    else if (type === 'Y') {
        for (let i = 0; i < 12; i++) {
            val = Math.round(Math.random() * 10000 + 20000)
            data.push({
                x: i,
                y: val
            })
            total += val
        }

        const monArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


        return {
            data,
            categories: monArr,
            stepDisp: total / 12,
            tickValues: [0, 3, 6, 9, 11]
        }
    }
}

const secToHMin = (s) => {
    let h = Math.trunc(s / (60 * 60))
    let m = (Math.round((s - (h * 60 * 60)) / 60)).toString()
    return {
        h, m
    }
}


let SleepPage = ({ data, elderlyId }) => {
    const pageMap = ['W', 'M', 'Y']
    const [page, setPage] = useState(0)
    const [categories, setCategories] = useState([])
    const [secSlept, setSecSlept] = useState(-1)
    const [tickValues, setTickValues] = useState([])

    const [lastUpdate, setLastUpdate] = useState('')
    const [lastUpdateVal, setLastUpdateVal] = useState('')

    const store = useStore()

    useEffect(async () => {
        let arr = ['M', 'Y'] // Day and week settled in home page
        let sleepData


        for (let i = 0; i < arr.length; i++) {
            console.log(data[arr[i]])
            if (data[arr[i]].length == 0) {
                sleepData = await getData('sleepSeconds', arr[i], elderlyId)
                if (sleepData.success) {
                    store.dispatch({ type: `update/sleepData/${arr[i]}`, payload: { data: sleepData.data } })
                }
            }
        }
    }, [])

    useEffect(() => {
        const d = new Date()
        setLastUpdate(dateToDaysAndTime(d))
        setLastUpdateVal(data['D'].slice(-1)[0].y)
        setCategories(getCategories(pageMap[page]))
        setTickValues(getTickVal(pageMap[page]))

        if (data && page == 0) {
            setSecSlept(data[pageMap[page]].slice(-1)[0].y)
        } else if (data) {
            let t = 0, d = 0
            data[pageMap[page]].map(({ x, y }) => {
                if(y > 0){
                    t += y
                    d += 1
                }
            })
            setSecSlept(t / d)
        }
    }, [page])

    return (
        <Center>
            <VStack mx={5} my={5}>
                <Box mx={3}>
                    <TabBar
                        nav={pageMap}
                        position={page}
                        setPos={(x) => { setPage(x) }}
                    />
                </Box>

                <VStack pl={3}>

                    <Text bold pt={3} color='gray.400'>AVERAGE</Text>

                    <HStack alignItems='center'>

                        <Heading>{secToHMin(secSlept)['h']}</Heading>
                        <Text bold px={1} color='gray.400'>hr</Text>
                        <Heading>{secToHMin(secSlept)['m']}</Heading>
                        <Text bold pl={1} color='gray.400'>min</Text>

                    </HStack>
                </VStack>

                {(data &&
                    <ChartComponent
                        chartData={data[pageMap[page]]}
                        categories={categories}
                        tickValues={tickValues} />
                )}

                <Box m={5} p={4} bg="gray.200" borderRadius={10}>
                    <HStack justifyContent='space-between'>
                        <Text>{lastUpdate}</Text>
                        <HStack justifyContent="center">
                            <Text bold>{secToHMin(lastUpdateVal)['h']}</Text>
                            <Text px={0.5} color='gray.400'>hr</Text>
                            <Text bold>{secToHMin(lastUpdateVal)['m']}</Text>
                            <Text pl={0.5} color='gray.400'>min</Text>
                        </HStack>
                    </HStack>
                </Box>
            </VStack>
        </Center >
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.sleepData,
        elderlyId: state.userInfo.elderlyId
    }
}

export default connect(mapStateToProps)(SleepPage)