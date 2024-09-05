// ImageQuiz.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// Import your images here
import china from '../assets/china.jpg';
import japan from '../assets/japan.jpg';
import south_korea from '../assets/south_korea.jpg';
import thailand from '../assets/thailand.jpg';
import william_shakespear from '../assets/william_shakespeare.jpg';
import charles_dicken from '../assets/charles_dicken.jpg';
import jane_austen from '../assets/jane_austen.jpg';
import mark_twain from '../assets/mark_twain.jpg';
import h20 from '../assets/h20.jpg';
import co2 from '../assets/co2.jpg';
import o2 from '../assets/o2.jpg';
import nacl from '../assets/nacl.jpg';
import monaco from '../assets/monaco.jpg';
import vatican_city from '../assets/vatican_city.jpg';
import san_marino from '../assets/san_marino.jpg';
import liechtenstein from '../assets/liechtenstein.jpg';
import tiger from '../assets/tiger.jpg';
import elephant from '../assets/elephant.jpg';
import lion from '../assets/lion.jpg';
import giraffe from '../assets/giraffe.jpg';

// Add more imports as needed

const ImageQuiz = ({ answerOptions, handleAnswerButtonClick, isDarkMode, clickedButtonIndex, buttonColors, currentQuestion }) => {
  return (
    <View style={styles.buttonContainer}>
      {answerOptions.map((answerOption, index) => (
        <TouchableOpacity
          key={index}
          style={[
            isDarkMode ? styles.darkButton : styles.lightButton,
            {
              backgroundColor:
                clickedButtonIndex === index
                  ? buttonColors[currentQuestion]
                  : isDarkMode
                    ? '#FAF9F6'
                    : '#000000'
            }
          ]}
          onPress={() => handleAnswerButtonClick(answerOption.isCorrect, index)}
        >
          {answerOption.image && (
            <Image source={eval(answerOption.answerImage)} style={styles.answerImage} />
          )}
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>{answerOption.answerText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    gap: 9,
  },
  darkButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    paddingHorizontal: 30,
    height: 70,
    width: 320,
    alignItems: 'flex-start',
    justifyContent: "center",
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  lightButton: {
    backgroundColor: '#000000',
    padding: 15,
    paddingHorizontal: 30,
    height: 70,
    width: 320,
    alignItems: 'flex-start',
    justifyContent: "center",
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  darkText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  lightText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 22,
  },
  answerImage: {
    width: "100%",
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default ImageQuiz;
