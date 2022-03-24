import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NewEmployee = () => {   
    const navigation = useNavigation();

    const goBack = () =>{
        navigation.navigate("Employee");
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>      
            <Pressable onPress={goBack} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={32} color='#777' />
            </Pressable>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Nuevo Empleado</Text>
                <View style={styles.containerIcon}>
                    <Ionicons style={styles.icon} name="person"/>
                </View>
                <Text style={styles.text}>
                    Asegurate de ingresar la información correcta. 
                    Aqui podras editar toda la información.
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Apellido'                 
                />
                <TextInput
                    style={styles.input}
                    placeholder='Correo'                
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'                
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirmar Contraseña'                
                />
            </View>

                    <Pressable
                        style={styles.btn}
                        onPress={goBack}
                    >
                        <Text style={styles.btnText} >Agregar</Text>
                    </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewEmployee;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        paddingVertical:20,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 30,
        marginVertical: 15,
        paddingLeft: 15,
        fontWeight: '500'
    },
    formContainer: {
        width: '100%',
        marginVertical: 16,
        paddingHorizontal: '10%',
        alignItems: 'center',
    },  
    input: {
        borderWidth: 1,
        borderColor: '#ababab',
        marginBottom: 24,
        height: 52,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 12,
        fontSize: 20,
    },
    backBtn: {
      backgroundColor: '#dddd',
      borderRadius: 100,
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 25,
      left: 16,
      zIndex: 2
  },
    inputArea: {
        borderWidth: 1,
        borderColor: '#ababab',
        marginBottom: 24,
        height: 100,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 12,
        paddingTop: 12,
        fontSize: 20,
        textAlignVertical: 'top'
    },
    btn: {
        backgroundColor: '#BFA658',
        fontSize: 24,
        height: 60,
        width: '80%',
        justifyContent: 'center',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
      },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginVertical: 20,
        marginHorizontal: 40
      },
      btnText: {
          color: '#fff',
          textAlign: 'center',
          fontSize: 24,
      },
    containerTitles: {
        marginBottom: 20,
    },
    icon:{
        fontSize: 80,
        color: '#777',
        paddingVertical: 10
    },
    containerIcon:{

        backgroundColor: '#dddd',
        borderRadius: 100,
        height: 120,
        width: 120,
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 20
    }
});