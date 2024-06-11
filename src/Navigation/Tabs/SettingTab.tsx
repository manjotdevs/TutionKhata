import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Setting from '../../Screens/Setting';

function SettingTab(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StackSettingScreen"
        component={Setting}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}

export default SettingTab;
