import React from 'react';
import Home from './src/screens/Home';
import MainScrean from './src/screens/Main';
import Setting from './src/screens/Setting';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="TutionKhata"
          component={Home}
          options={{headerTitleAlign: 'center'}}
        />
        <Stack.Screen name="main" component={MainScrean} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
