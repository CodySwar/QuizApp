// ModeSelection.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ModeSelection = ({ onSelectMode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => setIsDarkMode(prevState => !prevState);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleMode}>
        <Icon
          name={isDarkMode ? 'weather-sunny' : 'weather-night'}
          size={30}
          color={isDarkMode ? '#fff' : '#000'}
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>Select Quiz Mode</Text>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#6200ee' }]} 
          onPress={() => onSelectMode('Easy')}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#6200ee' }]} 
          onPress={() => onSelectMode('Normal')}
        >
          <Text style={styles.buttonText}>Normal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#6200ee' }]} 
          onPress={() => onSelectMode('Hard')}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:Dimensions.get('screen').width,
    gap:10,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap:10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 10,
    width: '35%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ModeSelection;