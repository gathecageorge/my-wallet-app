import React from 'react';
import { Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlobalStyle from '../styles';
import helper from '../Helper'

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient colors={helper.mainColors} style={GlobalStyle.containerCenter}>
      <StatusBar backgroundColor={helper.statusBarColor} barStyle={helper.statusBarStyle} />

      <Text style={[GlobalStyle.labelCenter, { marginBottom: 20 }]}>{helper.appName}</Text>

      <TouchableOpacity style={[GlobalStyle.buttonFullWidth, { marginBottom: 10 }]} onPress={() => navigation.navigate('ImportWallet')}>
        <Text style={GlobalStyle.buttonText}>Import Existing Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={GlobalStyle.buttonFullWidth} onPress={() => navigation.navigate('GenerateWallet')}>
        <Text style={GlobalStyle.buttonText}>Generate New Wallet</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
});
