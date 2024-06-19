import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';
import Main from '../../Screens/Main';
import {Background,Text} from '../../utils/Themes';
import {SView} from '../../utils/Styled';

function HomeTab(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <SView className={`flex-1 ${Background}`}>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen
            name="StackHomeScreen"
            component={Home}
            options={{
              headerShown: true,
              headerTitle:'Home',
              headerStyle:{backgroundColor: Background.primary},
              headerTitleStyle:{color: Text.primary}
              
            }}
          />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </SView>
    </>
  );
}

export default HomeTab;
