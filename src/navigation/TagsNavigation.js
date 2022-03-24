  import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import NewTags from '../screens/Tags/NewTags';
import ViewTags from '../screens/Tags/ViewTags';
import EditTags from "../screens/Tags/EditTags";


const TagsNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="ViewTags"
                component={ViewTags}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="NewTags"
                component={NewTags}
                options={{
                    title: "Nueva Categoria"
                }}
            />
             <Stack.Screen 
                name="EditTags"
                component={EditTags}
                options={{
                    title: "Editar Categoria"
                }}
            />
            
        </Stack.Navigator>
    );
}

export default TagsNavigation;