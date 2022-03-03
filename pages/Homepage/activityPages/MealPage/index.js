import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { NativeBaseProvider, Box, Text, Center, VStack } from "native-base";
import Constants from "expo-constants";

const FirstRoute = () => <Center flex={1} my="4">
    This is Tab 1
</Center>;

const SecondRoute = () => <Center flex={1} my="4">
    This is Tab 2
</Center>;

const ThirdRoute = () => <Center flex={1} my="4">
    This is Tab 3
</Center>;

const FourthRoute = () => <Center flex={1} my="4">
    This is Tab 4{" "}
</Center>;

const initialLayout = {
    width: Dimensions.get("window").width
};
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
});

const MealsNavigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{
        key: "first",
        title: "Tab 1"
    }, {
        key: "second",
        title: "Tab 2"
    }, {
        key: "third",
        title: "Tab 3"
    }, {
        key: "fourth",
        title: "Tab 4"
    }]);

    const renderTabBar = () => <></>

    return <TabView navigationState={{
        index,
        routes
    }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
        marginTop: StatusBar.currentHeight
    }} />;
}

const MealPage = () => {

    return (
        <Box justifyContent="center" alignContent="center">
            <Center>
                <Box w="300px" h="400px">
                    <MealsNavigation />
                </Box>
            </Center>
        </Box>
    )
}

export default MealPage