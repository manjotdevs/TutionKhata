import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screens/Home';
import Main from '../../Screens/Main';


function HomeTab(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <>
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
    </>
  );
}

export default HomeTab;
