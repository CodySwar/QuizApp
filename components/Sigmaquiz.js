// SigmaQuiz.js
import React, { useState } from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import ModeSelection from './ModeSelection';
import QuizPart from './QuizPart';


const SigmaQuiz = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

  const handleRestart = () => {
    setSelectedMode(null);
  };

  return (
    <View style={styles.container}>
      {!selectedMode ? (
        <ModeSelection onSelectMode={handleModeSelection} />
      ) : (
        <QuizPart selectedMode={selectedMode} onRestart={handleRestart} navigation = {navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    width:Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SigmaQuiz;
