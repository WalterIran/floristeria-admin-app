import { StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { removeValue } from '../../utils/asyncStorage';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

const btns = [
  {
    icon: 'account-edit-outline',
    title: 'Editar perfil',
    desc: 'Cambia la información general de tu perfil',
    goTo: 'EditProfile'
  },
  {
    icon: 'security',
    title: 'Seguridad',
    desc: 'Edita tus credenciales de inicio de sesión',
    goTo: 'SendEmail'
  },
]

const UserOpts = () => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAuth();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  }

  const logout = () => {
    removeValue();
    setAuth(null);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.iconBox, styles.shadow, styles.mainIcon]}>
        <MCIcon name='account' size={150} color={"#333"} />
      </View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Bienvenido {auth?.user?.userName || ''}</Text>
      {
        btns.map((item, index) => {
          return(
            <Pressable key={index} style={[styles.pressable, styles.shadow]} onPress={() => navigateTo(item.goTo)}>
              <View>
                <View style={[styles.iconBox, styles.menuIcon]}>
                  <MCIcon name={item.icon} size={65} color={"#333"} />
                </View>
              </View>
              <View style={styles.textSection}>
                  <Text style={styles.btnTitle}>{item.title}</Text>
                  <Text style={styles.btnDesc}>{item.desc}</Text>
              </View>
            </Pressable>
          );
        })
      }

      <Pressable style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
      </Pressable>
    </ScrollView>
  )
}

export default UserOpts

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 32
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  mainIcon: {
    backgroundColor: '#ccc',
    width: 180,
    height: 180,
    marginBottom: 24
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#BFA658',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    height: 140,
    width: '85%',
    maxWidth: 400,
    marginVertical: 16
  },
  menuIcon: {
    backgroundColor: '#BFA658',
    width: 90,
    height: 90,
  },
  textSection: {
    flex: 1,
    marginLeft: 16,
    height: '100%',
    justifyContent: 'space-evenly'
  },
  btnTitle: {
    fontSize: 24,
    color: '#333'
  },
  btnDesc: {
    fontSize: 14,
    color: '#666'
  },
  logoutBtn: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF6962',
    width: '85%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  logoutBtnText: {
    color: '#FF6962',
    fontSize: 24
  }
})