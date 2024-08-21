import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Alert, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HDNodeWallet, Mnemonic } from 'ethers';
import axios from 'axios';
import * as bip39 from 'bip39';
import GlobalStyle from '../styles';
import helper from '../Helper';
import * as Environment from '../environment'

export default function HomeScreen({ route, navigation }) {
  const [mnemonic, setMnemonic] = useState(route.params['mnemonic']);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [keyIndex, setKeyIndex] = useState(1);
  const [useWallet, setUseWallet] = useState(false);
  const [walletBalance, setWalletBalance] = useState('');
  const [runningGenerate, setRunningGenerate] = useState(false);

  const toggleShowMnemonic = () => {
    setShowMnemonic(!showMnemonic);
  };

  const clearWallet = async () => {
    try {
      await AsyncStorage.removeItem('mnemonic');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome', params: {} }]
      });
    } catch (error) {
      console.error('Error clearing mnemonic from AsyncStorage:', error);
    }
  };

  const renderMnemonic = () => {
    if (!showMnemonic) {
      return '*'.repeat(mnemonic.length);
    }
    return mnemonic;
  };

  const isNumericMoreThan0 = (value) => {
    if (/^\d+$/.test(value) && Number(value) > 0) {
      return true;
    }

    return false;
  };

  const getWalletBalance = async (address) => {
    const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${Environment.ETHSCAN_API_KEY}`;
    const priceUrl = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR';

    try {
      const response = await axios.get(url);
      const price_response = await axios.get(priceUrl);

      const data = response.data;
      const price_data = price_response.data;

      const balance = Number(BigInt(data.result) * 1000000000000000n / 1000000000000000000n) / 1000000000000000;
      const eur_balance = price_data.EUR * balance;
      const usd_balance = price_data.USD * balance;

      return `${balance} ETH ( ${eur_balance.toFixed(2)} EUR | ${usd_balance.toFixed(2)} USD)`;
    } catch (error) {
      console.error('Error fetching data:', error);
      return 'Error fetching data: ' + url;
    }
  };

  const getWalletFromMnemonicAndIndex = async (mnemonic, index) => {
    let path = "m/44'/60'/0'/0/" + (Number(index) - 1);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HDNodeWallet.fromMnemonic(
            Mnemonic.fromPhrase(mnemonic),
            path
          )
        );
      }, 0);
    });
  };

  const generateAddress = () => {
    if (isNumericMoreThan0(keyIndex)) {
      setRunningGenerate(true);
      setWalletBalance('Loading balance ...');
      setUseWallet({ address: 'Generating address ...', privateKey: 'Generating private key ...' });

      getWalletFromMnemonicAndIndex(mnemonic, keyIndex).then((wallet) => {
        setUseWallet(wallet);
        getWalletBalance(wallet.address).then((balance) => {
          setWalletBalance(balance);
          setRunningGenerate(false);
        });
      });
    } else {
      setKeyIndex(1);
      alert('You must enter a number for key Index greater than 0');
    }
  }

  const handleGenerateOverwrite = () => {
    let temp = bip39.generateMnemonic();
    setMnemonic(temp);
    setUseWallet({ address: '', privateKey: '' });
    setWalletBalance('');
  };

  const copyAddressToClipboard = () => {
    helper.copyToClipboard(useWallet.address);
  };

  const copyPrivateKeyToClipboard = () => {
    helper.copyToClipboard(useWallet.privateKey);
  };

  const getPrivateKeyHideShow = () => {
    if (showPrivateKey)
      return useWallet.privateKey;

    if (!useWallet.privateKey)
      return '';

    return '*'.repeat(useWallet.privateKey.length);
  };

  const showHidePrivateKey = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  return (
    <LinearGradient colors={helper.mainColors} style={GlobalStyle.container}>
      <StatusBar backgroundColor={helper.statusBarColor} barStyle={helper.statusBarStyle} />

      <ScrollView>
        <TouchableOpacity onPress={toggleShowMnemonic} style={[GlobalStyle.textButton, { marginBottom: 10 }]} >
          <Ionicons name={showMnemonic ? 'eye' : 'eye-off'} color='#fff' size={24} />
          <Text style={GlobalStyle.textButtonText}>
            {showMnemonic ? 'Hide' : 'Show'} Your Mnemonic
          </Text>
        </TouchableOpacity>

        <Text style={GlobalStyle.readOnlyInput} >{renderMnemonic()}</Text>

        <TouchableOpacity style={GlobalStyle.buttonFullWidth} onPress={() => Alert.alert(
          'Clear Wallet',
          'Are you sure you want to clear your wallet? This action cannot be undone.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', onPress: clearWallet }
          ],
          { cancelable: false }
        )}>
          <Text style={GlobalStyle.buttonText}>Clear Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={GlobalStyle.buttonFullWidth} onPress={handleGenerateOverwrite}>
          <Text style={GlobalStyle.buttonText}>Regenerate/Overwrite Mnemonic (Not Persisted)</Text>
        </TouchableOpacity>

        <Text style={[
          GlobalStyle.labelLeft,
          { marginTop: 20, fontSize: 20 }
        ]}>Generate Addresses</Text>
        <Text style={[
          GlobalStyle.labelLeftSmall,
          { fontSize: 14 }
        ]}>
          You can generate infinite addresses, from the 1st index all the way to n.
          By default the first key index is generated.
        </Text>

        <TextInput
          keyboardType='numeric'
          style={[GlobalStyle.inputOneLine, { marginBottom: 10 }]}
          placeholder='Which n-th key to generate?'
          onChangeText={setKeyIndex}
          value={keyIndex}
          defaultValue='1' />

        <TouchableOpacity disabled={runningGenerate} style={[
          GlobalStyle.buttonFullWidth,
          runningGenerate ? GlobalStyle.buttonRunning : GlobalStyle.buttonIdle,
          { marginBottom: 10 }
        ]} onPress={generateAddress}>
          <Text style={GlobalStyle.buttonText}>{runningGenerate ? 'Processing ...' : 'Generate Address/Private Key'}</Text>
        </TouchableOpacity>

        <Text style={GlobalStyle.labelLeftSmall}>Address Num: {keyIndex}</Text>
        <TouchableOpacity disabled={runningGenerate || !useWallet.address} onPress={copyAddressToClipboard} style={GlobalStyle.readOnlyInput}>
          <Text style={GlobalStyle.readOnlyInputText}>{useWallet.address}</Text>
          <Ionicons name={runningGenerate || !useWallet.address ? '' : 'copy-outline'} color={'#fff'} size={24} />
        </TouchableOpacity>

        <Text style={GlobalStyle.labelLeftSmall}>Balance Num: {keyIndex}</Text>
        <Text style={GlobalStyle.readOnlyInput}>{walletBalance}</Text>

        <TouchableOpacity onPress={showHidePrivateKey} style={{ flexDirection: 'row' }}>
          <Text style={[GlobalStyle.textButtonText, { width: '50%' }]}>Private Key Num: {keyIndex}</Text>

          <View style={{ width: '48%', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Ionicons name={showPrivateKey ? 'eye' : 'eye-off'} color={'#fff'} size={24} />
            <Text style={GlobalStyle.textButtonText}>
              {showPrivateKey ? 'Hide' : 'Show'} Private Key
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity disabled={runningGenerate || !useWallet.privateKey} onPress={copyPrivateKeyToClipboard} style={GlobalStyle.readOnlyInput}>
          <Text style={GlobalStyle.readOnlyInputText}>{getPrivateKeyHideShow()}</Text>
          <Ionicons name={runningGenerate || !useWallet.privateKey ? '' : 'copy-outline'} color={'#fff'} size={24} />
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
});
