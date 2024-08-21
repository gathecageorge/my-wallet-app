import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as bip39 from 'bip39';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../styles';
import helper from '../Helper'

export default function GenerateWalletScreen({ navigation }) {
  const [mnemonic, setMnemonic] = useState(bip39.generateMnemonic());
  const [isChecked, setIsChecked] = useState(false);

  const handleGenerate = () => {
    setMnemonic(bip39.generateMnemonic());
  };

  const getGroupedMnemonic = () => {
    let tempArray = mnemonic.split(' ');
    let tempGroup = [];
    for (let i = 0; i < tempArray.length; i += 2) {
      tempGroup.push([i, tempArray[i], tempArray[i + 1]]);
    }

    return tempGroup;
  };

  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleProceed = async () => {
    if (isChecked) {
      await AsyncStorage.setItem('mnemonic', mnemonic);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { mnemonic: mnemonic } }]
      });
    } else {
      alert('Please confirm you have copied the mnemonic.');
    }
  };

  const copyMnemonicToClipboard = () => {
    helper.copyToClipboard(mnemonic);
  };

  return (
    <LinearGradient colors={helper.mainColors} style={GlobalStyle.container}>
      <StatusBar backgroundColor={helper.statusBarColor} barStyle={helper.statusBarStyle} />

      <ScrollView>
        <Text style={[
          GlobalStyle.labelLeftSmall,
          { marginBottom: 10, fontSize: 20, fontWeight: 'bold' }
        ]}>Generated Mnemonic</Text>

        <View>
          {getGroupedMnemonic().map((wordGroup, index) => (
            <View style={styles.wordContainer} key={index}>
              <Text style={styles.wordNumber}>{wordGroup[0] + 1}.</Text>
              <Text style={styles.word}>{wordGroup[1]}</Text>
              <Text style={styles.wordNumber}>{wordGroup[0] + 2}.</Text>
              <Text style={styles.word}>{wordGroup[2]}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={copyMnemonicToClipboard} style={[
          GlobalStyle.textButton,
          { marginTop: 20, marginBottom: 20 }
        ]}>
          <Ionicons name='copy-outline' color='#fff' size={24} />
          <Text style={GlobalStyle.textButtonText}>Copy Mnemonic</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGenerate} style={[
          GlobalStyle.textButton,
          { marginBottom: 20 }
        ]}>
          <Text style={GlobalStyle.textButtonTextUnderline}>Regenerate Mnemonic</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={GlobalStyle.checkboxContainer} onPress={handleCheckBoxToggle}>
          <View style={[GlobalStyle.checkbox, isChecked && GlobalStyle.checked]}>
            {isChecked && <Text style={GlobalStyle.checkMark}>✓</Text>}
          </View>
          <Text style={GlobalStyle.labelLeftSmall}>I have copied the mnemonic to a safe place</Text>
        </TouchableOpacity>


        <TouchableOpacity style={GlobalStyle.buttonFullWidth} onPress={handleProceed}>
          <Text style={GlobalStyle.buttonText}>Proceed to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  wordNumber: {
    fontSize: 18,
    color: '#fff',
    marginRight: 5,
  },
  word: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
});
