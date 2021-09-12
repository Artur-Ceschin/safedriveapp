import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home"
  >
    <Drawer.Screen name="SignIn" component={SignIn} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Home" component={Home} />
  </Drawer.Navigator>
);
export function Routes() {
  return (
    <NavigationContainer>
      <AppDrawerScreen />
    </NavigationContainer>
  );
}
