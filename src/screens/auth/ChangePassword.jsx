import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//AXIOS
import axios from '../../api/axios';
import Errors from '../../components/Errors';
import useAuth from '../../hooks/useAuth';
import Wrapper from '../../components/Wrapper';
const CHANGE_PASS_URL = '/auth/change-password'
const FORGOT_PASS_URL = '/auth/email-pin'

const ChangePassword = ({ route}) => {

    const { auth } = useAuth();
    const navigation = useNavigation();
    const { email, expiration } = route?.params;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            setLoading(true);
            try {
                const data = {
                    ...formValue,
                    email
                }
                
                const response = await axios.put(CHANGE_PASS_URL,
                    JSON.stringify(data),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                const msg = response.data.msg && 'Contraseña cambiada con éxito';
                alert(msg);
                const destination = auth?.user?.userName ? 'UserMenu' : 'Login'
                navigation.navigate(destination);
            } catch (error) {
                if(!error?.response) {
                    setErrors({Servidor: 'Error en el servidor'})
                }else if(error.response?.status === 401) {
                    setErrors({Inautorizado: 'Pin expirado'});
                }
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    const resendPin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(FORGOT_PASS_URL,
                JSON.stringify({email}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const expiration = response?.data.pinExpirationDate;
            const msg = response?.data.msg;

            alert(msg);

        } catch (error) {
            if(!error?.response) {
                setErrors({Servidor: 'Error en el servidor'})
            }else if(error.response?.status === 401) {
                setErrors({Inautorizado: 'Pin de recuperación inválido'});
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
  return (
      <Wrapper>

        <SafeAreaView style={styles.container}>
            
            <Pressable onPress={goBack} style={styles.backBtn}>
                <IonIcons name="arrow-back" size={32} color='#777' />
            </Pressable>
            <Image style={styles.imgFloat} source={require('../../assets/interflora.jpg')} />
            <Text style={[styles.text, styles.title]} >
                Cambia tu contraseña
            </Text>
            <Text style={styles.text} >
                Introduce el código enviado al correo e introduce tu nueva contraseña
            </Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Código de verificación'
                    autoCapitalize='none'
                    keyboardType='number-pad'
                    value={formik.values.recoveryPin}
                    onChangeText={(text) => formik.setFieldValue('recoveryPin', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nueva contraseña'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={formik.values.password}
                    onChangeText={(text) => formik.setFieldValue('password', text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirmar contraseña'
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={formik.values.repeatPassword}
                    onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
                />
                <Errors errors={formik.errors} title='Errores de campos' />
                <Errors errors={errors} title='Mensajes del servidor' />
                <Pressable
                    style={styles.btn}
                    onPress={formik.handleSubmit}
                >
                    <Text style={styles.btnText} >Guardar</Text>
                    {loading && <ActivityIndicator style={{marginLeft: 8}} size='small' color="#fff"/>}
                </Pressable>
            </View>
            <Pressable style={{width: "80%"}} onPress={resendPin}><Text style={[styles.text, styles.link]} >Reenviar código a mi correo</Text></Pressable>
        </SafeAreaView>
      </Wrapper>
  )
}

export default ChangePassword;

const initialValues = {
    recoveryPin: '',
    password: '',
    repeatPassword: '',
}

function validationSchema(){
    return {
        recoveryPin: Yup.string().length(6, 'Pin inválido').required("Campo requerido"),
        password: Yup.string().required("Campo requerido"),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null],'Confirmar contraseña debe ser igual a contraseña'),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    backBtn: {
        backgroundColor: '#dddd',
        borderRadius: 100,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 64,
        left: 16,
        zIndex: 2
    },
    imgFloat: {
        width: '80%',
        height: 120,
        marginVertical: 24,
        resizeMode: 'contain',
    },
    img: {
        width: '80%',
        height: 120,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 12,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        width: '80%',
        marginBottom: 16
    },
    link: {
        color: '#0042EC',
        textDecorationLine: "underline",
        width: '100%'
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
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
        alignItems: 'center',
        flexDirection: 'row',
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