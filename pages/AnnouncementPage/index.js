import React from 'react'
import { View, Text } from 'native-base'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const AnnouncementStack = createNativeStackNavigator()

let AnnouncementComponent = () => {
    return (
        <View>
            <Text>Announcement page</Text>
        </View>
    )
}

export default function AnnouncementPage() {
    return (
        <AnnouncementStack.Navigator>
            <AnnouncementStack.Screen name="Announcement" component={AnnouncementComponent} />
        </AnnouncementStack.Navigator>
    )
}