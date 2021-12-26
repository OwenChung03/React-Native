import React from 'react';
import { Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Stocks from './Stocks';
import ForumDiscussion from './ForumDiscussion';
import { createStackNavigator } from '@react-navigation/stack';
import CompanyInfo from './CompanyInfo';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { makeMutable } from 'react-native-reanimated';
const Tab = createMaterialBottomTabNavigator();

const Homepage = () => {
    return(
    <Tab.Navigator
        initialRouteName="Stocks"
        activeColor="#f0edf6"
        inactiveColor="black"
        barStyle={{ backgroundColor: '#196098' }}
    >
        <Tab.Screen 
        name="Stocks" 
        component={Stocks}></Tab.Screen>
        <Tab.Screen name="Forum Discussion" component={ForumDiscussion}/>    
 
        
    </Tab.Navigator>
    )


}

export default Homepage;