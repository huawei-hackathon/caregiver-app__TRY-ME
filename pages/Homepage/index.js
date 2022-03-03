import React, { useState, useEffect } from 'react';
import { Text, Box, Center, Heading, HStack, VStack, Pressable } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Cards
import HeartCard from './components/HeartCard';
import StepsCard from './components/StepsCard';
import BloodO2Card from './components/BloodO2Card';
import FoodCard from './components/FoodCard';

// Pages
import HeartRatePage from './activityPages/HeartPage';

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
            <VStack w="100%" border height='100%' paddingX={5} paddingY={3} space={3} justifyContent='flex-start'>
                <Heading size='2xl' textAlign='left'>Today's Update</Heading>
                
                {/* <Text color='gray.600'>{dateNow}</Text> */}


                <Pressable w="100%" rounded='md' shadow={3}
                    onPress={() => {
                        navigation.navigate("Heart Rate")
                    }}
                >
                    <HeartCard />
                </Pressable>

                <HStack width="100%" justifyContent='space-between' height='25%'>
                    <Center w='48%' rounded="md" shadow={3} height='100%'>
                        <StepsCard />
                    </Center>
                    <Center w='48%' rounded="md" shadow={3} height='100%'>
                        <BloodO2Card />
                    </Center>
                </HStack>

                <Center w='100%' rounded='md' shadow={3}>
                    <FoodCard />
                </Center>
            </VStack>
        </Center >
    )
}

const HomePage = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomePageContent} />
            <HomeStack.Screen name="Heart Rate" component={HeartRatePage} />
        </HomeStack.Navigator>
    )
}

export default HomePage