import { createStackNavigator } from "@react-navigation/stack";
import Setting from "../screans/Setting";
const Stack = createStackNavigator();

export default function SettingNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScrean"
        component={Setting}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}
