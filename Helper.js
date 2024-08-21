import * as Clipboard from 'expo-clipboard';

class HelperModule {
    appName = 'myWallet Blockchain App'
    mainColors = ['#ff7e5f', '#feb47b']
    statusBarColor = '#ff7e5f'
    statusBarStyle = 'light-content'
    headerTintColor = '#fff'
    loadingSpinnerColor = '#fff'

    copyToClipboard = async (copyMessage) => {
        await Clipboard.setStringAsync(copyMessage);
    };

    // fetchCopiedText = async () => {
    //     const text = await Clipboard.getStringAsync();
    //     return text
    // };
}
const instance = new HelperModule()

export default instance
