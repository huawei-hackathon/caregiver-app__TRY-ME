import * as React from 'react';
import { useState } from 'react'
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NativeBaseProvider, Box, Text, Center, usePropsResolution } from 'native-base';
import { connect, Provider, useStore } from 'react-redux'

import 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux setup
import { store } from './redux/store'

// Import pages
import LoginPage from './pages/login'
import SignupPage from './pages/signup'

import ProfilePage from './pages/profile'
import HomePage from './pages/Homepage'
import PastRecordPage from './pages/pastRecords';
import ChatPage from './pages/ChatPage'

let Stack = createNativeStackNavigator();
let Tab = createBottomTabNavigator();


let Handler = ({ login }) => {
  let store = useStore()

  if (login) {
    return (
      <>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name == 'Past Records') {
                iconName = focused ? 'clipboard' : 'clipboard-outline'
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Past Records" component={PastRecordPage} />
          <Tab.Screen name="Chat" component={ChatPage} />
          <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
      </>
    )
  } else {
    return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Signup' component={SignupPage} />
        <Stack.Screen name='Login' component={LoginPage} />
      </Stack.Navigator>
    )
  }
}

const mapStateToProps = (state) => {
  const { login } = state
  return {
    login
  }
}

Handler = connect(mapStateToProps)(Handler)


let App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Provider store={store}>
          <Handler />
        </Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App

const styles = StyleSheet.create({
})