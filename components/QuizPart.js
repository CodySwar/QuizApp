import React, { useState, useWindowDimensions } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert , Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { questions } from './Questions';
import ProgressBar from './ProgressBar';
 ///const {width, height} = Dimensions.get('screen');

// const window = Dimensions.get('window'); 
// const width = window.width * window.scale; 
// const height = window.height * window.scale;
const QuizPart = ({ selectedMode, onRestart, navigation }) => {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height ;
  const modeColors = {
    "Easy": '#4bbe87',
    "Normal": '#f6c249',
    "Hard": '#ff403a',
  };
  const modebgLight = { "Easy": '#b1e9c9', "Normal": '#fdf1c7', "Hard": '#FEBFBD' };
  const abcd = ['A ) ', 'B ) ', 'C ) ', 'D ) '];
  const numOfHearts = 5;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hearts, setHearts] = useState(numOfHearts);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [buttonColors, setButtonColors] = useState(Array(questions.length).fill(null));
  const toggleSwitch = () => setIsDarkMode((previousState) => !previousState);

  const filteredQuestions = questions.filter(q => q.questionMode === selectedMode);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
      setButtonColors(prevColors => {
        const newColors = [...prevColors];
        newColors[currentQuestion] = '#009a6e'; // green
        return newColors;
      });
    } else {
      setHearts((prevHearts) => {
        const newHearts = prevHearts - 1;
        if (newHearts === 0) {
          Alert.alert(
            "Quiz Over",
            `You answered ${correctAnswers} questions correctly.`,
            [{ text: "OK", onPress: onRestart }]
          );
          return 0;
        }
        return newHearts;
      });

      setButtonColors(prevColors => {
        const newColors = [...prevColors];
        newColors[currentQuestion] = '#d80032'; // red
        return newColors;
      });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < filteredQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setClickedButtonIndex(null); // Reset clicked button index for the next question
    } else {
      Alert.alert(
        'Quiz Completed',
        `You answered ${correctAnswers} questions correctly.`,
        [{ text: 'OK', onPress: onRestart }]
      );
    }
  };


  const handleAnswerButtonClick = (isCorrect, index) => {
    setClickedButtonIndex(index);
    setTimeout(() => {
      handleAnswer(isCorrect);
    }, 100); // Adjust the delay as needed to ensure the color change is visible
  };

  const handleQuit = () => {
    Alert.alert(
      'Quiz Ended',
      `You answered ${correctAnswers} out of ${filteredQuestions.length} questions correctly.`,
      [{ text: 'OK', onPress: () => navigation.navigate('WelcomeScreen')}]
    );
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1c1c1c', '#0a0a0a'] : ['#fff', '#e0e0e0']}
      style={[styles.container,{width:width, height:height}]}
    >
      <View style={styles.header}>
        <Text style={isDarkMode ? styles.darkTitle : styles.lightTitle}>Quiz App</Text>
      </View>
      <View style={isDarkMode ? styles.switchDarkContainer : styles.switchLightContainer}>
        <TouchableOpacity onPress={toggleSwitch}>
          <View>
            <Icon
              name={isDarkMode ? 'weather-night' : 'weather-sunny'}
              size={41}
              color={isDarkMode ? '#fff' : '#000'}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar
          bgcolor="#4bbe87"
          progress={(currentQuestion / 60) * 100}
          width={320}
          height={16}
        />
      </View>
      <View style={styles.heartsContainer}>
        {Array.from({ length: hearts }, (_, index) => (
          <Icon key={index} name="heart" size={30} color="red" />
        ))}
        {Array.from({ length: numOfHearts - hearts }, (_, index) => (
          <Icon key={index} name="heart-outline" size={30} color="red" />
        ))}
      </View>

      <View style={[styles.questionModeCont, { backgroundColor: modebgLight[filteredQuestions[currentQuestion % filteredQuestions.length].questionMode] }]}>
        <Text style={[isDarkMode ? styles.darkQuestion : styles.lightQuestion, { fontSize: 10, color: modeColors[filteredQuestions[currentQuestion % filteredQuestions.length].questionMode], textAlign: "center", height: "100%", width: "100%", paddingLeft: 0, paddingRight: 0 }]}>
          {filteredQuestions[currentQuestion % filteredQuestions.length].questionMode}
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={isDarkMode ? styles.darkQuestion : styles.lightQuestion}>
          {filteredQuestions[currentQuestion % filteredQuestions.length].questionText}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {filteredQuestions[currentQuestion % filteredQuestions.length].answerOptions.map((answerOption, index) => (
          <TouchableOpacity
            key={index}
            style={[
              isDarkMode ? styles.darkButton : styles.lightButton,
              {
                backgroundColor:
                  clickedButtonIndex === index
                    ? buttonColors[currentQuestion]
                    : isDarkMode
                      ? '#8000FF'
                      : '#000000'
              }
            ]}
            onPress={() => handleAnswerButtonClick(answerOption.isCorrect, index)}
          >
            <Text style={styles.buttonText}>{abcd[index]}{answerOption.answerText}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 0, position: 'absolute', bottom: 27 }}>
        <TouchableOpacity onPress={handleQuit}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#858585" }}>Quit</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    padding: 0,
    margin:0,
  },
  header: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '8%',
    //     border:2,
    // borderStyle:'solid',
    // borderColor:"red",
  },
  switchDarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left: '20%',
    top: '5.8%',
    zIndex: 3,
  },
  switchLightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left: '20%',
    top: '5.8%',
    zIndex: 3,
  },
  heartsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    top: '6%',
  },
  questionModeCont: {
    top: '10.8%',
    right: '30%',
    backgroundColor: 'black',
    paddingTop: 1,
    paddingBottom: 0,
    height: 17,
    width: 40,
    margin: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    borderRadius: 16,
  },
  darkTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  lightTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
  },
  questionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 50,
    position: 'relative',
  },
  darkQuestion: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  lightQuestion: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Ensure buttons are centered
    width: '100%', // Use full width of the container
    marginBottom: 20,
    gap: 9,
  },
  darkButton: {
    backgroundColor: '#8000FF',
    padding: 15,
    paddingHorizontal: 30,
    height: 70,
    width: 320,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: 320,
    height: 16,
    borderRadius: 16,
    top: '5%',
  },

});

export default QuizPart;
