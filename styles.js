import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  bigIcon: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },

  // Labels CSS 
  labelCenter: {
    fontSize: 24,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
  labelCenterSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'center',
  },
  labelLeft: {
    fontSize: 24,
    marginBottom: 5,
    color: '#fff',
  },
  labelLeftSmall: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },

  // Buttons CSS
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  textButtonTextUnderline: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonFullWidth: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: '#ff7e5f',
    fontSize: 18,
  },
  buttonIdle: {
    backgroundColor: '#fff',
  },
  buttonRunning: {
    backgroundColor: 'gray',
  },

  // Text Input CSS
  inputOneLine: {
    height: 50,
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#fff',
    flexDirection: 'row',
  },
  input: {
    height: 100,
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
    flexDirection: 'row',
  },
  readOnlyInput: {
    height: 60,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
    flexDirection: 'row',
  },
  readOnlyInputText: {
    color: '#fff',
    marginRight: 10,
    width: '90%',
  },

  // Checkbox CSS
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#fff',
  },
  checkMark: {
    color: '#000',
    fontSize: 14,
  },
});