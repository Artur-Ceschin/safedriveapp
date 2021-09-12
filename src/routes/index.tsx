import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../components/CustomDrawer';

import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { Home } from '../screens/Home';
import { AvailableBonus } from '../screens/AvailableBonus';
import { Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home"
  >
    <Drawer.Screen
      name="Home"
      component={Home}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="home" />,
      }}
    />
    <Drawer.Screen
      name="Bonus"
      component={AvailableBonus}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="cash" />,
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={Profile}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="people" />,
      }}
    />
  </Drawer.Navigator>
);
export function Routes() {
  return (
    <NavigationContainer>
      <Screen name="SignIn" component={SignIn} />
      <AppDrawerScreen />
    </NavigationContainer>
  );
}
