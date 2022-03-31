import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ActivityIndicator, Button } from 'react-native';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Wrapper from '../../components/Wrapper';

import axios from '../../api/axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useAuth from '../../hooks/useAuth';

const newTag_URL = '/tags/createTags';

const initialValues = {
  tagName: '',
  tagDescription: '',
  discount: '',
  discountExpirationDate: new Date() || '',
}

const NewTags = () => {
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const { auth } = useAuth();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const goBack = () => {
    navigation.navigate("ViewTags")
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      setLoading(true);
      try {
        const response = await axios.post(newTag_URL,
          JSON.stringify(formValue),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        goBack();
      } catch (error) {
        if (!error?.response) {
          setErrors({ Servidor: 'Error en el servidor' })
        } else if (error.response?.status === 401) {
          setErrors({ Inautorizado: 'Correo o contraseña incorrecta' });
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
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder='Nombre de la Categoria'
            value={formik.values.tagName}
            onChangeText={(text) => formik.setFieldValue('tagName', text)}
          />
          <TextInput
            style={[styles.descripcion]}
            placeholder='Descripcion'
            value={formik.values.tagDescription}
            onChangeText={(text) => formik.setFieldValue('tagDescription', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Descuento'
            value={formik.values.discount}
            onChangeText={(text) => formik.setFieldValue('discount', text)}
          />

          <View style={styles.formContainer}>


            <Pressable
              style={styles.btn}
              onPress={showDatepicker}
            >
              <Text style={styles.btnText} >Fecha de Vencimiento</Text>
            </Pressable>
            {show && (
              <DateTimePicker
                testID="discountExpirationDate"
                style={{ width: '100%' }}
                is24Hour={true}
                mode={mode}
                display="default"
                maximumDate={Date.parse(new Date())}
                minimumDate={Date.parse(new Date(1930, 0, 1))}
                timeZoneOffsetInMinutes={60}
                value={date}
                onChange={onChange}
              />
            )}
          </View>

          <Pressable
            style={styles.btn}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.btnText} >Crear Categoria</Text>
            {loading && <ActivityIndicator size='small' color="#fff" />}
          </Pressable>
        </View>
      </SafeAreaView>
    </Wrapper>
  )
}

export default NewTags;

function validationSchema() {
  return {
    tagName: Yup.string().required("Campo requerido"),
    tagDescription: Yup.string().required("Campo requerido"),
    discount: Yup.number().required("Campo requerido"),
    discountExpirationDate: Yup.string().required("Campo requerido")
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
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom:30
},
btnText: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 20,
},
  dateContainer: {
    width: '80%',
    marginHorizontal: 40,
    borderColor: '#ababab',
    borderWidth: 1,
    borderRadius: 20,
    height: 270,
    marginBottom: 15,
  },
  picker: {
    marginTop: 10
  },
  dateText: {
    fontSize: 20,
    color: "#ababab",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});