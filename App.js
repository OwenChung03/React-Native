import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {WebView} from 'react-native-webview'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stocks from './Components/Stocks'
import ForumDiscussion from './Components/ForumDiscussion';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
          initialRouteName="Stocks"
          activeColor="#f0edf6"
          inactiveColor="black"
          barStyle={{ backgroundColor: '#196098' }}
      >
        <Tab.Screen name="Stocks" component={Stocks}></Tab.Screen>
        <Tab.Screen name="Forum Discussion" component={ForumDiscussion} >
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
