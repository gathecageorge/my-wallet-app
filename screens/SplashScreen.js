import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../styles';
import helper from '../Helper'

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        checkMnemonic();
    }, []);

    const checkMnemonic = async () => {
        try {
            const savedMnemonic = await AsyncStorage.getItem('mnemonic');
            if (savedMnemonic) {
                doNavigate('Home', savedMnemonic);
            } else {
                doNavigate('Welcome', null);
            }
        } catch (error) {
            console.error('Error retrieving mnemonic from AsyncStorage:', error);
            await AsyncStorage.removeItem('mnemonic');
            doNavigate('Welcome', null);
        }
    };

    const doNavigate = (toPage, mnemonic) => {
        setTimeout(function () {
            navigation.reset({
                index: 0,
                routes: [{ name: toPage, params: { mnemonic: mnemonic } }]
            });
        }, 3000);
    };

    return (
        <LinearGradient colors={helper.mainColors} style={GlobalStyle.containerCenter}>
            <StatusBar backgroundColor={helper.statusBarColor} barStyle={helper.statusBarStyle} />
            <Image style={GlobalStyle.bigIcon} source={require('../assets/icon.png')} />
            <ActivityIndicator size='large' color={helper.loadingSpinnerColor} />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
});
