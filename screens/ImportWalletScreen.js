import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as bip39 from 'bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../styles';
import helper from '../Helper'

export default function ImportWalletScreen({ navigation }) {
  const [mnemonic, setMnemonic] = useState('');

  const handleImport = async () => {
    const formattedMnemonic = mnemonic.trim().toLocaleLowerCase();

    if (bip39.validateMnemonic(formattedMnemonic)) {
      await AsyncStorage.setItem('mnemonic', formattedMnemonic);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { mnemonic: formattedMnemonic } }]
      });
    } else {
      alert('Invalid mnemonic. Please try again.');
    }
  };

  return (
    <LinearGradient colors={helper.mainColors} style={GlobalStyle.containerCenter}>
      <StatusBar backgroundColor={helper.statusBarColor} barStyle={helper.statusBarStyle} />

      <Text style={[
        GlobalStyle.labelCenterSmall,
        { marginBottom: 10, fontSize: 20 }
      ]}>Enter your 12/15/18/21/24 word mnemonic</Text>

      <TextInput
        style={GlobalStyle.input}
        placeholder='Enter your 12-word mnemonic'
        onChangeText={setMnemonic}
        value={mnemonic}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={GlobalStyle.buttonFullWidth} onPress={handleImport}>
        <Text style={GlobalStyle.buttonText}>Import</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
});
