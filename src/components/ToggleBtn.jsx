import { Pressable } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const ToggleBtn = () => {
    const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <IonIcon name="menu" color="#333" size={30} />
    </Pressable>
  )
}

export default ToggleBtn;