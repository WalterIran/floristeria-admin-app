import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState,useEffect } from "react";
import {Picker} from '@react-native-picker/picker';

//AXIOS
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import Errors from '../../components/Errors';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const REGISTER_URL = '/users/register-employee'

const initialValues = {
    userName: '',
    userLastname: '',
    userRole: '',
    email: '',
    password: '',
    repeatPassword: '',
}

function validationSchema(){
    return {
        userName: Yup.string().required("Campo requerido"),
        userLastname: Yup.string().required("Campo requerido"),
        userRole: Yup.string().required("Campo requerido"),
        email: Yup.string().required("Campo requerido").email("Correo inválido"),
        password: Yup.string().required("Campo requerido"),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null],'Confirmar contraseña debe ser igual a contraseña'),
    }
}

const NewEmployee = () => {
    const [errors, setErrors] = useState({});  
    const navigation = useNavigation();
    const [selectedState, setSelectedState] = useState();
    const [loading, setLoading] = useState(false);

    const goBack = () =>{
        navigation.navigate("Employee");
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            setLoading(true);
            try {
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify(formValue),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }     
                );
                goBack();
            } catch (error) {
                if(!error?.response) {
                    setErrors({Servidor: 'Error en el servidor'})
                }else if(error.response?.status === 401) {
                    setErrors({Inautorizado: 'Correo o contraseña incorrecta'});
                }
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });
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
                    value={formik.values.userName}
                    onChangeText={(text) => formik.setFieldValue('userName', text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Apellido'  
                    value={formik.values.userLastname}
                    onChangeText={(text) => formik.setFieldValue('userLastname', text)}               
                />
                </View>
                 <View style={styles.pickerView}>
                    <Picker
                        selectedValue={formik.values.userRole= selectedState}
                        onValueChange={(itemValue) =>
                            setSelectedState(itemValue)
                        }                           
                        key={formik.values.userRole}
                    >
                        {formik.values.userRole == '' && <Picker.Item value="" enabled={false}/>}
                        <Picker.Item label="Seleccionar rol de usuario" value= 'null' enabled={false}/>
                        <Picker.Item label="Empleado" value= 'employee'/>
                        <Picker.Item label="Administrador" value='admin'/>
                                     
                    </Picker>
                </View>
                <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Correo'      
                    value={formik.values.email}
                    onChangeText={(text) => formik.setFieldValue('email', text)}          
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'     
                    value={formik.values.password}
                    secureTextEntry={true}
                    onChangeText={(text) => formik.setFieldValue('password', text)}            
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirmar Contraseña' 
                    value={formik.values.repeatPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}                        
                />
                <Errors errors={formik.errors} title='Errores de campos' />
                <Errors errors={errors} title='Mensajes del servidor' />
                </View>
                <Pressable
                    style={styles.btn}
                    onPress={formik.handleSubmit}
                >
                    <Text style={styles.btnText} >Crear cuenta</Text>
                    {loading && <ActivityIndicator size='small' color="#fff"/>}
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
        marginBottom: 20,
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
    },
    pickerView: {
        marginHorizontal: 20,
        height: 52,
        width: '90%',
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 65,
    }
});