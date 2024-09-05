import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuizQuestion = ({ question, onAnswer }) => {
  if (!question) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No question available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      {question.answerOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => onAnswer(option.isCorrect)}
        >
          <Text style={styles.answerText}>{option.answerText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
  },
  answerText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});

export default QuizQuestion;
