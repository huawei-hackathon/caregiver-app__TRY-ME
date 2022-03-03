import React, { useState, useEffect } from 'react';
import { Text, Box, Center, Heading, HStack, VStack, Pressable, ScrollView } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Cards
import HeartCard from './components/HeartCard';
import StepsCard from './components/StepsCard';
import SleepTime from './components/SleepCard';
import FoodCard from './components/FoodCard';

// Pages
import HeartRatePage from './activityPages/HeartPage';
import StepcountPage from './activityPages/StepcountPage';
import SleepPage from './activityPages/SleepPage';
import MealPage from './activityPages/MealPage';

// Utils
import { dateToStr } from '../../utils'

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
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomePageContent} />
            <HomeStack.Screen name="Heart Rate" component={HeartRatePage} />
            <HomeStack.Screen name="Step Count" component={StepcountPage} />
            <HomeStack.Screen name="Sleep" component={SleepPage} />
            <HomeStack.Screen name="Meals" component={MealPage} />
        </HomeStack.Navigator>
    )
}

export default HomePage