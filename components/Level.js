import {View, Dimensions, StyleSheet,TouchableOpacity,SafeAreaView,StatusBar, Text} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkMode } from './DarkModeContext';
import { questions } from './Questions';
export default function Level({navigation}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <SafeAreaView style = {[styles.body,{ backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <StatusBar barStyle = {isDarkMode? 'light-content':'dark-content'}/>
        <View style={[styles.container,]}>
          <TouchableOpacity style={styles.iconContainer} onPress={toggleDarkMode}>
            <Icon
              name={isDarkMode ? 'weather-night' : 'weather-sunny'}
              size={41}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        </View>
        {/*<View style = {styles.buttonContainer}>
          <TouchableOpacity style = {[styles.button, { backgroundColor: isDarkMode ? '#FAF9F6' : '#000' }]}
          onPress={() => navigation.navigate('Quiz')}>
            <Text style = {[styles.buttonText,{ color: isDarkMode ? '#000' : '#fff' }]}>Level 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {[styles.button, { backgroundColor: isDarkMode ? '#FAF9F6' : '#000' }]}
          >
            <Text style = {[styles.buttonText,{ color: isDarkMode ? '#000' : '#fff' }]}>Level 2</Text>
            </TouchableOpacity>
          <TouchableOpacity style = {[styles.button, { backgroundColor: isDarkMode ? '#FAF9F6' : '#000' }]}
          >
            <Text style = {[styles.buttonText,{ color: isDarkMode ? '#000' : '#fff' }]}>Level 3</Text>
            </TouchableOpacity>
          <TouchableOpacity style = {[styles.button, { backgroundColor: isDarkMode ? '#FAF9F6' : '#000' }]}
          > 
            <Text style = {[styles.buttonText,{ color: isDarkMode ? '#000' : '#fff' }]}>Level 4</Text>
            </TouchableOpacity>
          <TouchableOpacity style = {[styles.button, { backgroundColor: isDarkMode ? '#FAF9F6' : '#000' }]}
          >
            <Text style = {[styles.buttonText,{ color: isDarkMode ? '#000' : '#fff' }]}>Level 5</Text>
            </TouchableOpacity>
        </View> */}
        <View style={styles.buttonContainer}>
          {[...new Set(questions.map((question) => question.level))].map((level, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                { backgroundColor: isDarkMode ? '#FAF9F6' : '#000' }
              ]}
              onPress={() => navigation.navigate('Quiz', { level })}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: isDarkMode ? '#000' : '#fff' }
                ]}
              >
                Level {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


    </SafeAreaView>
  );
}
const styles= StyleSheet.create({
  body:{
    padding:0,
    width:"100%",
    height:"100%",
    flex:1,
    justifyContent: 'center',
    alignItems:"center",
    gap:5,
  },
  container:{
    
  },
  iconContainer:{
    marginBottom:20
  },
  buttonContainer:{
    gap:9,
    //top:"35%",
    //left:"32%"
    width:"100%",
    justifyContent: 'center',
    alignItems:"center",
  },
  button:{
    
    padding: 16,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 16,
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },

});