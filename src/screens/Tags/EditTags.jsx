import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, TextInput, Pressable, Platform, Button } from 'react-native';
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import useAuth from '../../hooks/useAuth';
import Errors from '../../components/Errors';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Wrapper from '../../components/Wrapper';

const tag_upt_url = '/tags/updateTag/';

const EditTags = ({ route }) => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [isPickerShown, setIsPickerShown] = useState(false);

  //Parametros
  const { tagId, tagName, tagDescription, discount, discountExpirationDate } = route?.params;

  //
  const [data, setData] = useState(null);
  const [Name, setName] = useState(null);
  const [Description, settagDescription] = useState(null);
  const [descuento, setdiscount] = useState(null);

  //DateTimePicker 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const goBack = () => {
    navigation.navigate("ViewTags");
  }

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

  const values = {
    tagName: Name || '',
    tagDescription: Description || '',
    discount: descuento || '',
    discountExpirationDate: new Date(date) || '',
  }

  const getTag = async () => {
    const response = await axiosPrivate.get(`/tags/findtag/${tagId}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const updateTag = async () => {
    try {
      validationSchema();
      setLoading(true);
      const response = await axiosPrivate.patch(tag_upt_url + tagId,
        JSON.stringify(values)
      )
        .then(function (response) {
          setData(response.data);
          goBack();
        })
        .catch(function (error) {
          if (!error?.response) {
            setErrors({ Servidor: 'Error en el servidor' });
          }
        });
      if (!response) {
        setErrors({ error: 'campos erroneos.' });
      }
      setLoading(false);
    } catch (error) {

    }
  }

  useEffect(() => {
    (async () => {
      try {
        await getTag();
        setDate(new Date(discountExpirationDate));
        setName(tagName);
        settagDescription(tagDescription);
        setdiscount(discount);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <>
      {
        data !== null && !loading ? (

          <SafeAreaView style={styles.container}>
            <Wrapper>
              <ScrollView >

                <View style={styles.formContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder='Nombre de la Categoria'
                    value={Name}
                    onChangeText={setName}
                  />
                  <TextInput
                    style={[styles.descripcion]}
                    placeholder='Descripcion'
                    multiline
                    value={Description}
                    onChangeText={settagDescription}
                    />
                  <TextInput
                    style={styles.input}
                    placeholder='Descuento'
                    value={descuento}
                    onChangeText={setdiscount}
                    keyboardType='number-pad'
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
                        style={styles.picker}
                        testID="discountExpirationDate"
                        mode={mode}
                        is24Hour={true}
                        maximumDate={Date.parse(new Date())}
                        minimumDate={Date.parse(new Date(1930, 0, 1))}
                        timeZoneOffsetInMinutes={60}
                        display="default"
                        value={date}
                        onChange={onChange}
                      />
                    )}
                  </View>

                  <Pressable
                    style={styles.btn}
                    onPress={updateTag}
                  >
                    <Text style={styles.btnText} >Actualizar Categoria</Text>
                    {loading && <ActivityIndicator size='small' color="#fff" />}
                  </Pressable>
                </View>

              </ScrollView>
            </Wrapper>
          </SafeAreaView>

        ) : (
          <ActivityIndicator />
        )
      }
    </>
  )
}

export default EditTags;

function validationSchema() {
  return {
    tagName: Yup.string().required("Campo requerido"),
    tagDescription: Yup.string().required("Campo requerido"),
    discount: Yup.number(),
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