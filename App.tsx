import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from './src/Navigation/Tabs/HomeTab';
import SettingTab from './src/Navigation/Tabs/SettingTab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Setting') {
              iconName = 'cog';
            }
            return <Icon name={iconName || 'home'} size={35} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 8,
          },
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{headerTitle: 'TutionKhata', headerTintColor: 'blue'}}
        />
        <Tab.Screen name="Setting" component={SettingTab} options={{headerShown:false}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
