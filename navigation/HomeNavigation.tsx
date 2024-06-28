import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screans/Home";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScrean"
        component={Home}
        options={{headerTitle:"TutionKhata"}}
      />
    </Stack.Navigator>
  );
}
