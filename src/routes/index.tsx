import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';
import { Home } from '../screens/Home';
import { AvailableBonus } from '../screens/AvailableBonus';
import { Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { alertReport } from '../screens/alertReport';

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
      name="Bonus Disponíveis"
      component={AvailableBonus}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="cash" />,
      }}
    />
    <Drawer.Screen
      name="Cadastro"
      component={Profile}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="people" />,
      }}
    />
    <Drawer.Screen
      name="Relatório de alertas"
      component={alertReport}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="analytics" />,
      }}
    />
  </Drawer.Navigator>
);
export function Routes() {
  return (
    <NavigationContainer>
      <AppDrawerScreen />
    </NavigationContainer>
  );
}
