import { StyleSheet, Text, View, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import CustomButton from './CustomButton';
import { removeValue } from '../utils/asyncStorage';
import useAuth from '../hooks/useAuth';

const CustomDrawer = (props) => {

    const { auth, setAuth } = useAuth();

    const logout = () => {
        removeValue('@user');
        setAuth(null);
    }

  return (
    <View style={styles.container}>
        <DrawerContentScrollView 
            {...props}
        >
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={require('../assets/interflora.jpg')} />
            </View>
            <Text style={styles.welcome}>Bienvenido {auth.user.userName}</Text>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <View style={styles.bottom}>
            <CustomButton text="Salir" customBtnStyle={styles.btnLogout} onPress={logout} />
        </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    imgContainer: {
        width: '100%',
        height: 140,
        alignItems: 'center',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '80%',
        resizeMode: 'contain',
    },
    welcome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 18,
    },
    bottom: {
        padding: 20,
        paddingBottom: 40
    },
    btnLogout: {
        backgroundColor: '#ff8c86',
        height: 45,
    }
})