import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert } from 'react-native';
export default ProgressBar = ({ bgcolor, progress, width, height }) => {
  return (
    <View style={[styles.ParentDiv, { width, height }]}>
      <View style={[styles.ChildDiv, { width: `${progress}%`, backgroundColor: bgcolor }]}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  ParentDiv: {
    backgroundColor: '#cfcfcf',
    borderRadius: 16,
    overflow: 'hidden',
  },
  ChildDiv: {
    height: '100%',
    borderRadius: 16, 
  },
});
