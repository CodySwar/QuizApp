import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, StatusBar, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { questions } from './Questions';
import ProgressBar from './ProgressBar';
import { useDarkMode } from './DarkModeContext';
import { useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default function Quiz({ navigation }) {
  const modeColors = {
    "Easy": '#4bbe87',
    "Normal": '#f6c249',
    "Hard": '#ff403a'
  };

  const modebgLight = { "Easy": "#b1e9c9", "Normal": "#fdf1c7", "Hard": "#FEBFBD" };
  const abcd = ['A ) ', 'B ) ', 'C ) ', 'D ) '];
  const numOfHearts = 5;
  const [hearts, setHearts] = useState(numOfHearts);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveIncorrect, setConsecutiveIncorrect] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [buttonColors, setButtonColors] = useState(Array(questions.length).fill(null));
  const [questionsAttempted, setQuestionsAttempted] = useState(0);
  const route = useRoute();
  const { level } = route.params;
  
  const levelQuestions = questions.filter(q => q.level === level);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const difficultyLevels = ['Easy', 'Normal', 'Hard'];

  const handleAnswer = (isCorrect, index) => {
    setQuestionsAttempted(prev => prev + 1);

    if (isCorrect) {
      setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
      setConsecutiveCorrect(prev => prev + 1);
      setConsecutiveIncorrect(0);

      if (consecutiveCorrect + 1 === 3) {
        if (difficulty !== 'Hard') {
          const nextDifficultyIndex = difficultyLevels.indexOf(difficulty) + 1;
          setDifficulty(difficultyLevels[nextDifficultyIndex]);
          setConsecutiveCorrect(0);
        }
      }

      setButtonColors(prevColors => {
        const newColors = [...prevColors];
        newColors[currentQuestion] = '#009a6e'; // green
        return newColors;
      });
    } else {
      setConsecutiveIncorrect(prev => prev + 1);
      setConsecutiveCorrect(0);

      setHearts(prevHearts => {
        const newHearts = prevHearts - 1;
        if (newHearts === 0) {
          Alert.alert(
            "Quiz Over",
            `You answered ${correctAnswers} questions correctly.`,
            [{ text: "OK", onPress: restartQuiz }]
          );
          return 0;
        }
        return newHearts;
      });

      if (consecutiveIncorrect + 1 === 2) {
        if (difficulty !== 'Easy') {
          const prevDifficultyIndex = difficultyLevels.indexOf(difficulty) - 1;
          setDifficulty(difficultyLevels[prevDifficultyIndex]);
          setConsecutiveIncorrect(0);
        }
      }

      setButtonColors(prevColors => {
        const newColors = [...prevColors];
        newColors[currentQuestion] = '#d80032'; // red
        return newColors;
      });
    }

    const currentDifficultyQuestions = filteredQuestions.filter(q => q.questionMode === difficulty);
    if (questionsAttempted + 1 === currentDifficultyQuestions.length) {
      if (difficulty === 'Hard') {
        const nextDifficultyIndex = difficultyLevels.indexOf(difficulty) - 1;
        setDifficulty(difficultyLevels[nextDifficultyIndex]);
      } else {
        const nextDifficultyIndex = difficultyLevels.indexOf(difficulty) + 1;
        if (nextDifficultyIndex < difficultyLevels.length) {
          setDifficulty(difficultyLevels[nextDifficultyIndex]);
        }
      }
      setConsecutiveCorrect(0);
      setQuestionsAttempted(0);
      setCurrentQuestion(0);
    }
  };

  const handleAnswerButtonClick = (isCorrect, index) => {
    handleAnswer(isCorrect, index);
    setClickedButtonIndex(index);
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setClickedButtonIndex(null);
      } else {
        Alert.alert(
          "Quiz Completed",
          `You answered ${correctAnswers} questions correctly.`,
          [{ text: "OK", onPress: restartQuiz }]
        );
      }
    }, 200);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setHearts(numOfHearts);
    setConsecutiveCorrect(0);
    setConsecutiveIncorrect(0);
    setDifficulty('Easy');
    setButtonColors(Array(questions.length).fill(null));
    setQuestionsAttempted(0);
  };

  const filteredQuestions = levelQuestions.filter(q => q.questionMode === difficulty);

  const handleQuit = () => {
    Alert.alert(
      'Quiz Ended',
      `You answered ${correctAnswers} out of ${filteredQuestions.length} questions correctly.`,
      [{ text: 'OK', onPress: () => navigation.navigate('WelcomeScreen') }]
    );
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1c1c1c', '#0a0a0a'] : ['#fff', '#e0e0e0']}
      style={styles.container}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={isDarkMode ? styles.darkTitle : styles.lightTitle}>Quiz App</Text>
      </View>
      <View style={isDarkMode ? styles.switchDarkContainer : styles.switchLightContainer}>
        <TouchableOpacity onPress={toggleDarkMode}>
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

      <ScrollView 
        horizontal={filteredQuestions[currentQuestion % filteredQuestions.length].answerOptions[0].answerImage ? true : false}
        contentContainerStyle={filteredQuestions[currentQuestion % filteredQuestions.length].answerOptions[0].answerImage ? styles.imageContainer : styles.buttonContainer}
      >
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
                      ? '#FAF9F6'
                      : '#000000'
              },
              answerOption.answerImage && styles.imageButton
            ]}
            onPress={() => handleAnswerButtonClick(answerOption.isCorrect, index)}
          >
            {answerOption.answerImage ? (
              <View style={styles.imageOptionContainer}>
                <Text style={[isDarkMode ? styles.lightText : styles.darkText, styles.imageOptionText]}>{abcd[index]}</Text>
                <Image source={answerOption.answerImage} style={styles.answerImage} />
              </View>
            ) : (
              <Text style={isDarkMode ? styles.lightText : styles.darkText}>{abcd[index]}{answerOption.answerText}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  },
  header: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: "8%",
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 0,
    //marginTop:10,
    top:45,
    gap: 9,
  },
  switchDarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left: '20%',
    top: "5.8%",
    zIndex: 3,
  },
  switchLightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left: '20%',
    top: "5.8%",
    zIndex: 3,
  },
  heartsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    top: "6%"
  },
  questionModeCont: {
    top: "5.8%",
    right:window.innerWidth/100*45,
    //right: '45%',
    backgroundColor: "black",
    paddingTop: 1,
    paddingBottom: 0,
    height: 17,
    width: 40,
    margin: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    borderRadius: 16,
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
    top:10,
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
    marginBottom: 9,
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
    marginBottom: 9,
  },
  imageButton: {
    //width: windowWidth * 0.8,
    //height: 200,
    //marginHorizontal: 5,
    width: windowWidth * 0.8, // Set a consistent width
    height:windowWidth * 0.7, // Make the height equal to width to form a square
    marginHorizontal: 5,
    alignItems: 'center', // Center the content horizontally
    //justifyContent: 'center', // Center the content vertically
    //borderRadius: 16, // Optional: rounding corners
    overflow: 'hidden', // Hide any overflow to maintain the aspect ratio
  },
  imageOptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageOptionText: {
    marginBottom: 10,
  },
  answerImage: {
    //width: '50%',
    //height:'150',
    //aspectRatio:'1',
    //resizeMode: 'contain',
    width: '80%', // Set the image to cover the whole width of the button
    height: '80%', // Set the image to cover the whole height of the button
    resizeMode: 'cover', // Cover the image while maintaining its aspect ratio
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
    top: "5%"
  },
  darkProgress: {
    color: '#fff',
    fontSize: 16,
  },
  lightProgress: {
    color: '#000',
    fontSize: 16,
  },
});