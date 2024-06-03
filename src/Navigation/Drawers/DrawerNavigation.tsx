import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../Screens/Home';
import Setting from '../../Screens/Setting';

const Drawer = createDrawerNavigator();

function DrawerNavigator(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} options={{headerShown:true}}/>
            <Drawer.Screen name="Setting" component={Setting} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;