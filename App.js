import 'react-native-get-random-values';
import { Buffer } from 'buffer';
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ImportWalletScreen from './screens/ImportWalletScreen';
import GenerateWalletScreen from './screens/GenerateWalletScreen';
import HomeScreen from './screens/HomeScreen';
import helper from './Helper'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="ImportWallet" component={ImportWalletScreen} options={{
          headerShown: true,
          title: 'Import Existing Wallet',
          headerTintColor: helper.headerTintColor,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: helper.statusBarColor
          }
        }} />
        <Stack.Screen name="GenerateWallet" component={GenerateWalletScreen} options={{
          headerShown: true,
          title: 'Generate New Wallet',
          headerTintColor: helper.headerTintColor,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: helper.statusBarColor
          }
        }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: true,
          title: helper.appName,
          headerTintColor: helper.headerTintColor,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: helper.statusBarColor
          }
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
