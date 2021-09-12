import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn } from '../screens/SignIn';
import { Profile } from '../screens/Profile';

const { Navigator, Screen } = createStackNavigator();
export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}
