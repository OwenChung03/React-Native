import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {WebView} from 'react-native-webview'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stocks from './Components/Stocks'
import ForumDiscussion from './Components/ForumDiscussion';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"   screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Homepage" component={Homepage} options={{headerShown: false}}/>
      </Stack.Navigator>
      {/* <Tab.Navigator
          initialRouteName="Stocks"
          activeColor="#f0edf6"
          inactiveColor="black"
          barStyle={{ backgroundColor: '#196098' }}
      >
        <Tab.Screen name="Stocks" component={Stocks}></Tab.Screen>
        <Tab.Screen name="Forum Discussion" component={ForumDiscussion} />
        <Tab.Screen name="Login" component={Login} >        
        </Tab.Screen>
      </Tab.Navigator> */}
    </NavigationContainer>

  );
}
