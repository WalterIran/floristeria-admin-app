import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ActivityIndicator,Platform, Button } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import Errors from '../../components/Errors';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getData, storeData } from '../../utils/asyncStorage';

const tag_upt_url = '/tags/updateTag/:tagId';

const EditTags = () => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [isPickerShown, setIsPickerShown] = useState(false);

  const dateChange = (e, value) => {
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    formik.setFieldValue('discountExpirationDate',value)
  }

  const initialValues = {
    tagName: auth?.tag?.tagName || '',
    
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

        const response = await axiosPrivate.patch(tag_upt_url + auth.tag.tagId,
          JSON.stringify(values)
          );

         const tag = response?.data?.result;
         
         let res = await getData();
         const tagInfo = {
           ...res,
           tag: tag
         }

         await storeData(tagInfo);
         res = await getData();
         setAuth({...res});
         alert('Categoria actualizada correctamente');
         navigation.goBack();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Nombre de la Categoria'
          value={formik.values.tagName}
          onChangeText={(text) => formik.setFieldValue('tagName',text)}
        />
        <TextInput
          style={[styles.descripcion]}
          placeholder='Descripcion'
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder='Descuento'
          autoCapitalize='none'
        />

        <View style={{ width: '100%', borderWidth: 1, borderColor: '#ababab', borderRadius: 16, padding: 16, marginBottom: 24 }}>
          <Text style={{ fontSize: 24, color: '#ababab' }}>Expiración del descuento</Text>
          {
            (!isPickerShown && Platform.OS === 'android') && (
              <Button title='Seleccionar fecha' color='#BFA658' onPress={() => setIsPickerShown(true)} />
            )
          }

          {
            (isPickerShown || Platform.OS === 'ios') && (
              <DateTimePicker
                testID="discountExpiration"
                style={{ width: '100%' }}
                mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={Date.parse(new Date())}
                minimumDate={Date.parse(new Date(1930, 0, 1))}
                timeZoneOffsetInMinutes={60}
                value={new Date()}
              //value={formik.values.}
              // onChange={dateChange}
              />
            )
          }
        </View>

        <Pressable
          style={styles.btn}
        >
          <Text style={styles.btnText} >Actualizar Categoria</Text>
          {loading && <ActivityIndicator size='small' color="#fff"/>}
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default EditTags;

function validationSchema () {
  return {
    tagName: Yup.string().required("Campo requerido"),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: '7%',
    backgroundColor: "#fff",
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
  text: {
    fontSize: 18,
    textAlign: 'center',
    width: '80%',
    marginBottom: 16
  },

  descripcion: {
    height: 175,
    borderWidth: 1,
    borderColor: '#ababab',
    marginBottom: 24,
    width: '100%',
    borderRadius: 12,
    paddingLeft: 12,
    fontSize: 24,
    textAlign: 'auto'
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