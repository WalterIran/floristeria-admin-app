import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";

//Stacks 
import AuthNavigation from "./AuthNavigation";
import DrawerNavigation from "./DrawerNavigation";
import EmployeeNavigation from "./EmployeeNavigation";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { auth } = useAuth();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            
            {
                auth !== null && auth !== undefined && Object.keys(auth).length !== 0 ?
                (   
                    <Stack.Screen 
                        name="Main"
                        component={DrawerNavigation}
                    />
                    ) : (                  
                    <Stack.Screen 
                        name="Auth"
                        component={AuthNavigation}
                    />
                )
            }
        </Stack.Navigator>
    );
}

export default Navigation;