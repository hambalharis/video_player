import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, LogBox} from 'react-native';
import Dashboard from './src/screens/Dashboard';
import VideoList from './src/screens/VideoList';

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      {LogBox.ignoreAllLogs()}
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Settings"
            component={VideoList}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
