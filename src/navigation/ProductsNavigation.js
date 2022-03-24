import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToggleBtn from "../components/ToggleBtn";

const Stack = createNativeStackNavigator();

//Screens
import ProductList from "../screens/products/ProductList";
import Product from "../screens/products/Product";
import Statistics from "../screens/products/Statistics";

const ProductsNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ProductList"
                component={ProductList}
                options={{
                    headerTitle: "Productos",
                    headerLeft: () => (
                        <ToggleBtn />
                    )
                }}
            />
            <Stack.Screen 
                name="NewProduct"
                component={Product}
                options={{
                    headerTitle: "Nuevo Producto"
                }}
            />
            <Stack.Screen 
                name="EditProduct"
                component={Product}
                options={{
                    headerTitle: "Editar Producto"
                }}
            />
            <Stack.Screen 
                name="ProductStatistics"
                component={Statistics}
                options={{
                    headerTitle: "Estadísticas de Producto"
                }}
            />
        </Stack.Navigator>
    );
}

export default ProductsNavigation;