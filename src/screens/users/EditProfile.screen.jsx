import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, ActivityIndicator, Platform, Button } from 'react-native';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import Errors from '../../components/Errors';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getData, storeData } from '../../utils/asyncStorage';

const USER_UPT_URL = '/users/update-customer/';

const EditProfile = () => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [isPickerShow, setIsPickerShow] = useState(false);

  const dateChange = (e, value) => {
    if(Platform.OS === 'android'){
      setIsPickerShow(false);
    }
    formik.setFieldValue('birthDate', value);
  }
  
  const initialValues = {
    personId: auth?.user?.personId || '',
    userName: auth?.user?.userName || '',
    userLastname: auth?.user?.userLastname || '',
    birthDate: new Date(auth?.user?.birthDate) || '',
    phoneNumber: auth?.user?.phoneNumber || '',
    address: auth?.user?.address || '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValues) => {
      setLoading(true);
      try {
        const keys = Object.keys(formValues).filter(key => formValues[key] !== '');
        const values = {};
        keys.forEach(key => {
          values[key] = formValues[key]
        });
        
        const response = await axiosPrivate.patch(USER_UPT_URL + auth.user.id,
            JSON.stringify(values)
        );

        const user = response?.data?.result;
        
        let res = await getData('@user');
        const userInfo = {
          ...res,
          user: user
        }
        await storeData('@user', userInfo);
        res = await getData('@user');
        setAuth({...res});
        alert('Perfil actualizado correctamente');
        navigation.goBack();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardDismissMode='on-drag'>
      <Text style={styles.title}>Edita la información general de tu perfil en Interflora</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Identidad'
        maxLength={13} 
        keyboardType='number-pad'
        value={formik.values.personId}
        onChangeText={(text) => formik.setFieldValue('personId', text)}
      />
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
      <View style={{width: '100%', borderWidth: 1, borderColor: '#ababab', borderRadius: 16, padding: 16, marginBottom: 24}}>
        <Text style={{fontSize: 24, color: '#ababab'}}>Fecha de nacimiento</Text>
        {
          (!isPickerShow && Platform.OS === 'android') && (
            <Button title='Seleccionar fecha' color='#BFA658' onPress={() => setIsPickerShow(true)}/>
          )
        }

        {
          (isPickerShow || Platform.OS === 'ios') && (
            <DateTimePicker
                testID="birthDate"
                value={formik.values.birthDate}
                style={{width: '100%'}}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={Date.parse(new Date())}
                minimumDate={Date.parse(new Date(1930, 0, 1))}
                timeZoneOffsetInMinutes={60}
                onChange={dateChange}
              />
          )
        }
      </View>
      <TextInput
        style={styles.input}  
        placeholder='Teléfono' 
        maxLength={8} 
        keyboardType='phone-pad'
        value={formik.values.phoneNumber}
        onChangeText={(text) => formik.setFieldValue('phoneNumber', text)}
      />
      <TextInput
        style={[styles.input, styles.multiline]} 
        placeholder='Dirección' 
        multiline 
        value={formik.values.address}
        onChangeText={(text) => formik.setFieldValue('address', text)}
      />
      <Errors errors={formik.errors} title='Errores de campos' />
      <Pressable
        style={styles.btn}
        onPress={formik.handleSubmit}
      >
          <Text style={styles.btnText} >Actualizar Información</Text>
          {loading && <ActivityIndicator size='small' color="#fff"/>}
      </Pressable>
    </ScrollView>
  )
}

export default EditProfile;

function validationSchema () {
  return {
    personId: Yup.string().length(13).matches(/^[0-9]+$/, 'Identidad inválida'),
    userName: Yup.string().required("Campo requerido"),
    userLastname: Yup.string().required("Campo requerido"),
    birthDate: Yup.string(),
    phoneNumber: Yup.string().length(8).matches(/^[0-9]+$/, 'Teléfono inválido'),
    address: Yup.string(),
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center'
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
  multiline: {
    height: 175
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