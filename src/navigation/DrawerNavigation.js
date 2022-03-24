import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import useAuth from '../hooks/useAuth';

//Screens and Stacks
import Home from '../screens/Home';
import OrderNavigation from '../navigation/OrdersNavigation';
import ProductsNavigation from './ProductsNavigation';

//Icons
import AntIcons from 'react-native-vector-icons/AntDesign';
import FA5Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import EmployeeNavigation from './EmployeeNavigation';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const { auth } = useAuth();

    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#BFA658',
                drawerActiveTintColor: '#fff',
                drawerLabelStyle:{
                    marginLeft: -25,
                    fontSize: 15,
                },
            }}
        >
            <Drawer.Screen 
                name='Home'
                component={Home}
                options={{
                    drawerLabel: 'Inicio',
                    title: 'Inicio',
                    drawerIcon: ({color}) => (
                        <AntIcons name='home' size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name='Profile'
                component={Home}
                options={{
                    drawerLabel: 'Mi Perfil',
                    drawerIcon: ({color}) => (
                        <FA5Icons name='user-circle' size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen 
                name='Orders'
                component={OrderNavigation}
                options={{
                    drawerLabel: 'Órdenes',
                    drawerIcon: ({color}) => (
                        <MaterialIcons name='event-note' size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen 
                name='Products'
                component={ProductsNavigation}
                options={{
                    headerShown: false,
                    drawerIcon: ({color}) => (
                        <EntypoIcons name='shop' size={22} color={color} />
                    ),
                }}
            />
            <Drawer.Screen 
                name='Tags'
                component={Home}
                options={{
                    drawerLabel: 'Etiquetas',
                    drawerIcon: ({color}) => (
                        <FA5Icons name='tag' size={22} color={color} />
                    )
                }}
            />
            {
                auth.user.userRole === 'admin' && (
                    
                     <Drawer.Screen 
                        name='Employees'
                        component={EmployeeNavigation}
                        options={{
                            drawerLabel: 'Empleados',
                            drawerIcon: ({color}) => (
                                <FA5Icons name='users-cog' size={22} color={color} />
                            ),
                            marginLeft: 10
                        }}
                    />
                )
            }
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;
