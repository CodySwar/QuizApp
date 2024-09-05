import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkMode } from './DarkModeContext';

const Welcome = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <SafeAreaView style={styles.anocontainer}>
      <StatusBar barStyle = {isDarkMode? 'light-content':'dark-content'}/>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        <TouchableOpacity style={styles.iconContainer} onPress={toggleDarkMode}>
          <Icon
            name={isDarkMode ? 'weather-night' : 'weather-sunny'}
            size={41}
            color={isDarkMode ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          Welcome to Quiz App
        </Text>
        <TouchableOpacity
          style={isDarkMode? styles.darkbutton:styles.lightbutton}
          onPress={() => navigation.navigate('Level')}
        >
          <Text style={isDarkMode? styles.darkbuttonText: styles.lightbuttonText}>Play Quiz</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity
          style={isDarkMode? styles.darkbutton:styles.lightbutton}
          onPress={() => navigation.navigate('SigmaQuiz')}
        >
          <Text style={isDarkMode? styles.darkbuttonText: styles.lightbuttonText}>Start Manual Quiz</Text>
        </TouchableOpacity>*/}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  anocontainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
  },
  iconContainer: {
    bottom: "5%",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    left: "0.5%",
  },
  darkbutton: {
    backgroundColor:'#FAF9F6',// '#6200ee',
    color:"black",
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
  },
  lightbutton:{
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 16,
    marginVertical: 10,
    width: '40%',
    alignItems: 'center',
  },
  lightbuttonText: {
    color: '#fff',
    fontSize: 16,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  darkbuttonText:{
    color: '#000',
    fontSize: 16,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default Welcome;
