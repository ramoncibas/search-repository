import React from 'react'
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Search from './pages/Search'
import Main from './pages/Main'


const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          options={{ 
            tabBarIcon: ({ color }) => <Feather name="home" size={20} color={color} /> 
          }} 
          name="Main"
          component={Main} />
        <Tab.Screen 
          options={{ 
            tabBarIcon: ({ color }) => <Feather name="search" size={20} color={color} /> 
          }} 
          name="Buscar"
          component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}