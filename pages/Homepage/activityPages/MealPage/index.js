import React, { useState, useEffect } from "react";
import { Dimensions, StatusBar } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { HStack, Image, Box, Text, Center, VStack, ArrowForwardIcon, ArrowBackIcon, ChevronRightIcon, ChevronLeftIcon, Pressable, ScrollView } from "native-base";
import { dateToDaysAndTime } from "../../../../utils";

const OneMealImage = ({ imgUri }) => {
    return (
        <Center flex={1}>
            <Image
                source={{ uri: imgUri }}
                alt="food pic"
                size="2xl"
            />
        </Center>
    )
}

const MealConts = ({ contents }) => {
    return (
        <ScrollView w="250px">
            {
                contents.map(({ name, type }) => (
                    <HStack h="50" px={3} py={0.5} bg="gray.100" borderRadius={5}
                        style={{
                            borderColor: 'lightgray',
                            borderWidth: '0.5px',
                            borderStyle: 'solid'
                        }}>
                        <Box width="60%" justifyContent='center'>
                            <Text bold fontSize='md'>{name}</Text>
                        </Box>
                        <Box flex={1} justifyContent='center'>
                            <Text
                                fontSize='sm'
                                textAlign='right'
                                italic
                                color="gray.500">{type}</Text>
                        </Box>
                    </HStack>
                ))
            }
        </ScrollView>
    )
}

const initialLayout = {
    width: Dimensions.get("window").width
};

const MealsNavigation = ({ routes, index, renderSceneObj, setIndex, }) => {

    const renderTabBar = () => <></>

    return (
        <>
            {
                (routes.length === 0 || renderSceneObj.length === 0) ? <></> :
                    <TabView navigationState={{
                        index,
                        routes
                    }} renderScene={SceneMap(renderSceneObj)} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
                        marginTop: StatusBar.currentHeight
                    }} />
            }
        </>
    )
}

const MealPage = () => {
    const [index, setIndex] = useState(0);
    const [mealInfo, setMealInfo] = useState([])
    const [renderSceneObj, setRenderSceneObj] = useState({})

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setMealInfo([{
            "uri": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1z0d_Jke01v4ErGgNeyx8ROBp-v0TW3ZxBg&usqp=CAU',
            contents: [{
                name: 'rice',
                type: 'carb'
            }],
            date: new Date()
        },
        {
            "uri": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoDXQSfMIpZf_4WULoLP-GukstEcDk_gFifQ&usqp=CAU',
            contents: [{
                name: 'brocolli',
                type: 'veg'
            }],
            date: new Date(2022, 3, 1)
        },
        {
            "uri": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYkbGWM8Exn0HpRgTakUUERfyGsSrTTNvu5A&usqp=CAU',
            contents: [{
                name: 'beef',
                type: 'meat'
            }],
            date: new Date(2022, 3, 2)
        }])
    }, [])

    useEffect(() => {
        let routeTmp = []
        let renderSceneObjTmp = {}

        mealInfo.map(({ date, uri }) => {
            routeTmp.push({
                key: date,
                title: `${date}-meal`
            })

            renderSceneObjTmp[date] = () => (
                <>
                    <OneMealImage
                        imgUri={uri}
                        date={date} />
                </>
            )
        })

        console.log('rt', routeTmp)
        console.log('rs', renderSceneObjTmp)
        setRoutes(routeTmp)
        setRenderSceneObj(renderSceneObjTmp)

    }, [mealInfo])

    return (
        <Box justifyContent="center" alignContent="center">
            {mealInfo.length > 0 &&
                <>
                    <Center>
                        <Text mt={3} fontSize="lg" bold
                            bg="gray.200"
                            px={5} py={1}>
                            {dateToDaysAndTime(mealInfo[index].date)}
                        </Text>

                        <Box
                            w="300px"
                            h="300px"
                            justifyContent="center"
                            alignItems="center">

                            <HStack
                                w="300px"
                                h="300px"
                                alignItems="center">

                                <Pressable onPress={() => {
                                    setIndex(index == 0 ? mealInfo.length - 1 : index - 1)
                                }}>
                                    <ChevronLeftIcon />
                                </Pressable>

                                <MealsNavigation
                                    routes={routes}
                                    index={index}
                                    setIndex={setIndex}
                                    renderSceneObj={renderSceneObj} />

                                <Pressable onPress={() => {
                                    setIndex(index == mealInfo.length - 1 ? 0 : index + 1)
                                }}>
                                    <ChevronRightIcon />
                                </Pressable>
                            </HStack>
                        </Box>
                        <MealConts contents={mealInfo[index].contents} />
                    </Center>
                </>
            }
        </Box>
    )
}

export default MealPage