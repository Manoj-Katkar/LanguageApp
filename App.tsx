/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Login from './src/screens/login/login.screen';
import SignUp from './src/screens/sign-up/signup.screen';
import './i18n';
// Update the type definition to include both screens
export type RootStackParamList = {
  SignUp: undefined; // Adjust the params if `House_Services` takes any
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#fafafa" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={
              {
                // headerShown:true
              }
            }
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
