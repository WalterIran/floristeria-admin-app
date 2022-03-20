import { StyleSheet, Text, View, Image, TextInput, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';

//Components
import Errors from '../../components/Errors';
import Wrapper from '../../components/Wrapper';

//AXIOS
import axios from '../../api/axios';
const FORGOT_PASS_URL = '/auth/email-pin'

const ForgotPassword = () => {
    const navigation = useNavigation();
    const { auth } = useAuth();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    const formik = useFormik({
        initialValues: { email: auth?.user?.email || ''},
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            setLoading(true);
            try {
                const response = await axios.post(FORGOT_PASS_URL,
                    JSON.stringify(formValue),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                const expiration = response?.data.pinExpirationDate;
                const msg = response?.data.msg;
                const email = formValue.email;

                alert(msg);
                navigation.navigate('ChangePassword', {email, expiration});

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
    });

  return (
    <Wrapper>
        <SafeAreaView style={styles.container}>
            <Pressable onPress={goBack} style={styles.backBtn}>
                <IonIcons name="arrow-back" size={32} color='#777' />
            </Pressable>
            <Image style={styles.imgFloat} source={require('../../assets/interflora.jpg')} />
            <Text style={[styles.text, styles.title]} >
                ¿Olvidaste tu contraseña?
            </Text>
            <Text style={styles.text} >
                Se enviará un código de verificación de 6 dígitos a tu correo electrónico, introducelo en la siguiente pantalla para cambiar tu contraseña.
            </Text>
            <Image style={styles.img} source={require('../../assets/mailImg.jpg')} />
            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.input,{color: auth?.user?.email && '#ccc', backgroundColor: auth?.user?.email && '#eee'}]}
                    placeholder='Correo'
                    autoCapitalize='none'
                    value={formik.values.email}
                    onChangeText={(text) => formik.setFieldValue('email', text)}
                    editable={auth?.user?.email && false}
                    textContentType='emailAddress'
                />
                <Errors errors={formik.errors} title='Errores de campos' />
                <Errors errors={errors} title='Mensajes del servidor' />
                <Pressable
                    onPress={formik.handleSubmit}
                    style={styles.btn}
                >
                    <Text style={styles.btnText} >Enviar código</Text>
                    {loading && <ActivityIndicator style={{marginLeft: 8}} size='small' color="#fff"/>}
                </Pressable>
            </View>
        </SafeAreaView>
    </Wrapper>
  )
}

export default ForgotPassword

function validationSchema(){
    return {
        email: Yup.string().required("Campo requerido").email("Correo inválido"),
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1,
        position: 'relative',
    },
    backBtn: {
        backgroundColor: '#dddd',
        borderRadius: 100,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 16,
        zIndex: 2
    },
    imgFloat: {
        width: '80%',
        height: 120,
        marginVertical: 24,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    img: {
        width: '80%',
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        alignSelf: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        width: '80%',
        marginBottom: 16,
        alignSelf: 'center',
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