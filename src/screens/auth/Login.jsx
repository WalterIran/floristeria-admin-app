import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import { getData, storeData } from '../../utils/asyncStorage';

//Components
import Wrapper from '../../components/Wrapper';
import Errors from '../../components/Errors';

//AXIOS
import axios from '../../api/axios';
const LOGIN_URL = '/auth/mobile/login'

const Login = () => {
    const navigation = useNavigation();
    const { setAuth, auth } = useAuth();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { email: "", password: ""},
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            setLoading(true);
            try {
                const response = await axios.post(LOGIN_URL,
                    JSON.stringify(formValue),
                    {
                        params: {
                            logintype: 'admin'
                        }
                    }
                );
                const user = response?.data;
                await storeData('@user',user);
                const res = await getData('@user');
                setAuth({...res});
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

    const goToForgotPassword = () => {
        navigation.navigate("ForgotPassword");
    }

  return (
      <Wrapper>
        <SafeAreaView style={styles.container}>
            <Image style={styles.img} source={require('../../assets/interflora.jpg')} />
            <Text style={[styles.text, styles.title]} >
                Inicia Sesión
            </Text>
            <Text style={styles.text} >
                Aplicación Administrativa
            </Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Correo'
                    autoCapitalize='none'
                    value={formik.values.email}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={formik.values.password}
                    onChangeText={(text) => formik.setFieldValue('password', text)}
                />
                <Errors errors={formik.errors} title='Errores de campos' />
                <Errors errors={errors} title='Mensajes del servidor' />
                <Pressable
                    style={styles.btn}
                    onPress={formik.handleSubmit}
                >
                    <Text style={styles.btnText} >Ingresar</Text>
                    {loading && <ActivityIndicator size='small' color="#fff"/>}
                </Pressable>
            </View>
            <Pressable onPress={goToForgotPassword}><Text style={[styles.text, styles.link]} >Olvidé mi contraseña</Text></Pressable>
        </SafeAreaView>
      </Wrapper>
  )
}

export default Login;

function validationSchema(){
    return {
        email: Yup.string().required("Campo requerido").email("Correo inválido"),
        password: Yup.string().required("Campo requerido"),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    img: {
        width: '80%',
        height: 120,
        marginVertical: 24,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    link: {
        color: '#0042EC',
        textDecorationLine: "underline"
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 30,
        paddingHorizontal: '10%'
    },  
    input: {
        borderWidth: 1,
        borderColor: '#ababab',
        marginBottom: 24,
        height: 52,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 12,
        fontSize: 24
    },
    btn: {
        backgroundColor: '#BFA658',
        fontSize: 24,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
    }
});