import React, { useEffect, useState } from 'react';
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
import { SignUp } from '../screens/SignUp';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppRoutes = () => (
  <AppStack.Navigator
    initialRouteName="SingIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="SingIn" component={SignIn} />
  </AppStack.Navigator>
);

const AppDrawerScreen = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
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
      name="Perfil"
      component={Profile}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="people" />,
      }}
    />

    {/* <Drawer.Screen
      name="Acelerometro"
      component={SpeedoMeter}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="people" />,
      }}
    /> */}
    
    <Drawer.Screen
      name="Relatório de alertas"
      component={alertReport}
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="analytics" />,
      }}
    />
    
    <Drawer.Screen
      name="Sair"
      options={{
        drawerIcon: () => <Icon as={Ionicons} name="exit" />,
      }}
    >
      {(props) => null}
    </Drawer.Screen>
  </Drawer.Navigator>
);

export function Routes() {

  const [userUuid, setUserUuid] = useState<string | null>();

  async function updateUserStatus() {
    const result = await AsyncStorage.getItem('@safeDriver:id');
    if (result) {
      setUserUuid(JSON.parse(result));
    }
  }

  useEffect(() => {
    updateUserStatus();
  }, []);

  if (userUuid) {
    return (
      <NavigationContainer onStateChange={(state) => {
        const index = state?.index || 0;
        const routeName = state?.routeNames[index];
        if (routeName === "Sair") {
          AsyncStorage.removeItem("@safeDriver:id").then(() => {
            setUserUuid(null);
          });
        }
      }}>
        <>
          <StatusBar backgroundColor="#326eb3" barStyle="light-content" />
          <AppDrawerScreen />
        </>
      </NavigationContainer>
    );
  }
  else {
    return (
      <NavigationContainer>
        <>
          <StatusBar backgroundColor="#326eb3" barStyle="light-content" />
          <AppStack.Navigator
            initialRouteName="SingIn"
            screenOptions={{
              headerShown: false,
            }}
          >
            <AppStack.Screen name="SingIn">
              {(props) => <SignIn {...props} updateUserStatusCallback={updateUserStatus}></SignIn>}
            </AppStack.Screen>
            <AppStack.Screen name="SingUp">
              {(props) => <SignUp {...props} updateUserStatusCallback={updateUserStatus}></SignUp>}
            </AppStack.Screen>
          </AppStack.Navigator>
        </>
      </NavigationContainer>
    );
  }
}
