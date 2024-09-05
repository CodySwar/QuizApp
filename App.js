// App.js or the main entry file
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/welcome';
import Quiz from './components/quiz';
import SigmaQuiz from './components/Sigmaquiz';
import {StyleSheet, View} from 'react-native';
import Level from './components/Level'
import QuizQuestion from './components/QuizQuestion'; // Importing QuizQuestion to be available for SigmaQuiz
import { DarkModeProvider,useDarkMode } from './components/DarkModeContext';

const Stack = createStackNavigator();

const App = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyle: {},
            headerShown: false,
            presentation: 'transparentModal' // Use modal transition
          }}
        >
          <Stack.Screen name="WelcomeScreen" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Level" component={Level} options={{ headerShown: false }} />
          <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
          <Stack.Screen name="SigmaQuiz" component={SigmaQuiz} options={{ headerShown: false }} />
          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default () => (
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
