import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import PendingOrdersScreen from '../screens/orders/PendingOrders.screen';
import CompleteOrdersScreen from '../screens/orders/CompleteOrders.screen';
import OrderDetail from '../screens/orders/OrderDetail.screen';
//import AuthNavigation from "./AuthNavigation";
//import useAuth from "../hooks/useAuth";

const TopBarNavigation = () => {
    return(
        <Tab.Navigator 
            initialRouteName="Pending"
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: "#333"
                }
            }}
        >
            <Tab.Screen 
                name="Pending"
                component={PendingOrdersScreen}
                options={{
                    tabBarLabel: "Pendientes",
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: "700"
                    }
                }}
            />
            <Tab.Screen 
                name="Completed"
                component={CompleteOrdersScreen}
                options={{
                    tabBarLabel: "Completadas",
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: "700"
                    }
                }}
            />
        </Tab.Navigator>
    );
}

const OrdersNavigation = () => {
    //const { auth } = useAuth();

    return (
        <Stack.Navigator initialRouteName="OrdersList">
            <Stack.Screen 
                name="OrdersList"
                component={TopBarNavigation}
                options={{
                    title: 'Pedidos',
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen 
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    title: "Detalle del Pedido"
                }}
            />
        </Stack.Navigator>
    );
}

export default OrdersNavigation;