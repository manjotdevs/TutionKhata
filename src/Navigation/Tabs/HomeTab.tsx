import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import Home from '../../Screens/Home';
import Main from '../../Screens/Main';
import {Background,Custom} from '../../utils/Themes';
import {SView} from '../../utils/Styled';

function HomeTab(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const colorScheme = useColorScheme();
  return (
    <>
      <SView className={`flex-1 ${Background}`}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: colorScheme==='dark'?Custom.BackgroundDark:Custom.BackgroundLight},
          }}>
          <Stack.Screen
            name="StackHomeScreen"
            component={Home}
            options={{
              headerShown: true,
              headerTitle: 'Home',
              headerBackButtonMenuEnabled: true,
              headerTransparent: true,
              headerTintColor: colorScheme==='dark'?Custom.TextDark:Custom.TextLight,
            }}
          />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </SView>
    </>
  );
}

export default HomeTab;
