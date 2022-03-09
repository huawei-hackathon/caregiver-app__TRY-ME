import React, { useState, useEffect } from 'react';
import { Text, Box, Center, Heading, HStack, VStack, Pressable, ScrollView } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Cards
import HeartCard from './components/HeartCard';
import StepsCard from './components/StepsCard';
import SleepTime from './components/SleepCard';
import FoodCard from './components/FoodCard';
import RoomCard from './components/RoomCard';

// Pages
import HeartRatePage from './activityPages/HeartPage';
import StepcountPage from './activityPages/StepcountPage';
import SleepPage from './activityPages/SleepPage';
import MealPage from './activityPages/MealPage';
import RoomPage from './activityPages/RoomPage';

// Utils
import { dateToStr, getData } from '../../utils'
import { useStore } from 'react-redux';

const HomeStack = createNativeStackNavigator()

let HomePageContent = ({ navigation }) => {
    const [dateNow, setDateNow] = useState()
    useEffect(() => {
        setInterval(() => {
            setDateNow(dateToStr(new Date()))
        }, 1000)
    }, [])

    return (
        <Center>
            <ScrollView>
                <VStack w="100%" border height='100%' paddingX={3} paddingY={3} space={3} alignItems='center' justifyContent='flex-start'>
                    <Heading>Today's Update</Heading>
                    {/* <Text color='gray.600'>{dateNow}</Text> */}

                    <Pressable w="100%" rounded='md' shadow={3}
                        onPress={() => {
                            navigation.navigate("Heart Rate")
                        }}
                    >
                        <HeartCard />
                    </Pressable>

                    <Pressable w="100%" rounded='md' shadow={3}
                        onPress={() => {
                            navigation.navigate("Location")
                        }}>
                        <RoomCard />
                    </Pressable>

                    <HStack width="100%" justifyContent='space-between' height='150px'>
                        <Pressable
                            w='180'
                            rounded="md"
                            shadow={3}
                            height='100%'
                            onPress={() => {
                                navigation.navigate('Step Count')
                            }}>
                            <StepsCard />
                        </Pressable>

                        <Pressable
                            w='180'
                            rounded="md"
                            shadow={3}
                            height='100%'
                            onPress={() => {
                                navigation.navigate('Sleep')
                            }}>

                            <SleepTime />
                        </Pressable>

                    </HStack>

                    <Pressable
                        w='100%' rounded='md'
                        onPress={() => { navigation.navigate('Meals') }}>
                        <FoodCard />
                    </Pressable>
                </VStack>
            </ScrollView>
        </Center >
    )
}

const HomePage = () => {
    const store = useStore()

    useEffect(async () => {
        let heartRateData = await getData('heartRate', 'D', store.getState().userInfo.elderlyId)
        if (heartRateData.success) {
            store.dispatch({ type: 'update/heartData/D', payload: { data: heartRateData.data } })
        }

        let stepData = await getData('stepCount', 'D', store.getState().userInfo.elderlyId)
        if (stepData.success) {
            store.dispatch({ type: "update/stepData/D", payload: { data: stepData.data } })
        }

        let sleepData = await getData('sleepSeconds', 'D', store.getState().userInfo.elderlyId)
        if (sleepData.success) {
            store.dispatch({ type: 'update/sleepData/D', payload: { data: sleepData.data } })
        }
        let sleepDataW = await getData('sleepSeconds', 'W', store.getState().userInfo.elderlyId)
        if (sleepDataW.success) {
            store.dispatch({ type: 'update/sleepData/W', payload: { data: sleepDataW.data } })
        }
    }, [])

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomePageContent} />
            <HomeStack.Screen name="Heart Rate" component={HeartRatePage} />
            <HomeStack.Screen name="Step Count" component={StepcountPage} />
            <HomeStack.Screen name="Sleep" component={SleepPage} />
            <HomeStack.Screen name="Meals" component={MealPage} />
            <HomeStack.Screen name="Location" component={RoomPage} />
        </HomeStack.Navigator>
    )
}

export default HomePage