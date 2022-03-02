import React, { useState, useEffect } from 'react';
import { Text, Box, Center, HStack, AspectRatio, Image, Stack, Heading, Badge } from 'native-base'
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'

import { getHAgo, dateToDaysAndTime } from '../../../utils';
import { TouchableNativeFeedbackComponent } from 'react-native';

const ContentList = ({ contList }) => {
    const allCont = []
    contList.forEach(({ type, name }) => {
        let typeCol = {
            'Veg': 'green.100',
            'Carb': 'amber.100',
            'Meat': 'red.100'
        }

        allCont.push(
            <>
                <HStack bg={typeCol[type]}>
                    <Box width="60%">
                        <Text fontSize='sm'>{name}</Text>
                    </Box>
                    <Box flex={1} justifyContent='center'>
                        <Text fontSize='2xs' textAlign='right'>{type}</Text>
                    </Box>
                </HStack>
            </>
        )
    });
    return (
        <Box p={2} w="170" h="150" border>
            <Text fontSize='md' borderWidth={0.5}>Contents: </Text>
            {allCont}
        </Box>
    )
}

const FoodCard = () => {
    const [lastMealTime, setLastMealTime] = useState('')
    const [foodImgUri, setFoodImgUri] = useState('')
    const [badgeColor, setBadgeColor] = useState('')
    const [lastFoodConts, setLastFoodConts] = useState([])

    useEffect(() => {
        setLastMealTime(new Date())
        setFoodImgUri('https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?k=20&m=1220017909&s=170667a&w=0&h=4I_l8ZyiZ8sebPsRo6UpFmdrV-MZgEvxb3smE-TbgLE=')
        setLastFoodConts([
            {
                'type': 'Carb',
                'name': 'Rice'
            },
            {
                'type': 'Veg',
                'name': 'Broccoli'
            },
            {
                'type': 'Veg',
                'name': 'Mushroom'
            },
            {
                'type': 'Meat',
                'name': 'Beef'
            },
        ])
    }, [])

    useEffect(() => {
        console.log('lm', lastMealTime)
        if (lastMealTime !== '') {
            console.log('h', getHAgo(lastMealTime))
            if (getHAgo(lastMealTime) > 8) {
                setBadgeColor('danger')
            }
            else if (getHAgo(lastMealTime) > 4) {
                setBadgeColor('warning')
            }
            else {
                setBadgeColor('success')
            }
        }
    }, [lastMealTime])

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
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md">
                        Meal
                    </Heading>

                    <HStack space={1}>
                        <Text>
                            Last meal taken:
                        </Text>
                        {
                            (lastMealTime) ?
                                <Badge colorScheme={badgeColor}>{dateToDaysAndTime(lastMealTime)}</Badge>
                                : <></>
                        }
                    </HStack>

                    <HStack width="100%" justifyContent='space-between'>
                        <Box shadow={2} w="160" h="160">
                            <Image source={{
                                uri: foodImgUri
                            }}
                                alt="Alternate Text"
                                size="xl"
                                borderRadius={20}
                            />
                        </Box>

                        <ContentList contList={lastFoodConts} />
                    </HStack>

                </Stack>
            </Stack>
            <Box>

            </Box>
        </Box >
    )
};

export default FoodCard