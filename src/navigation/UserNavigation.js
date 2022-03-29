import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//Screens
import UserMenu from '../screens/users/UserOpts.screen';
import EditProfile from '../screens/users/EditProfile.screen';
import ForgotPassword from "../screens/auth/ForgotPassword";
import ChangePassword from "../screens/auth/ChangePassword";
import AuthNavigation from "./AuthNavigation";
import useAuth from "../hooks/useAuth";

const UserNavigation = () => {
    const { auth } = useAuth();
    return(
        <Stack.Navigator initialRouteName="UserMenu">
            {
                auth !== null && auth !== undefined && Object.keys(auth).length !== 0? 
                (
                    <>
                    <Stack.Screen 
                        name="UserMenu"
                        component={UserMenu}
                        options={{
                            title: "Mi Cuenta"
                        }}
                    />
                    <Stack.Screen 
                        name="EditProfile"
                        component={EditProfile}
                        options={{
                            title: "Editar Perfil"
                        }}
                    />
                    <Stack.Screen 
                        name="SendEmail"
                        component={ForgotPassword}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name="ChangePassword"
                        component={ChangePassword}
                        options={{
                            headerShown: false
                        }}
                    />
                    </>
                ) : (
                    <>
                    <Stack.Screen 
                        name="LoginStack"
                        component={AuthNavigation}
                        options={{
                            headerShown: false
                        }}
                    />
                    </>
                )
            }
        </Stack.Navigator>
    );
}

export default UserNavigation;
