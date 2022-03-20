import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//Screens
import LoginScreen from '../screens/auth/Login';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import ChangePasswordScreen from "../screens/auth/ChangePassword";

const AuthNavigation = () => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigation;