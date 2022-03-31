import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//Screens
import Employee from "../screens/employee/Employee";
import EmployeeDetails from "../screens/employee/EmployeeDetails";
import NewEmployee from "../screens/employee/NewEmployee";

const EmployeeNavigation = () => {
    return(
        <Stack.Navigator initialRouteName="Employee">
            <Stack.Screen 
                name="Employee"
                component={Employee}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="EmployeeDetails"
                component={EmployeeDetails}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="NewEmployee"
                component={NewEmployee}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default EmployeeNavigation;