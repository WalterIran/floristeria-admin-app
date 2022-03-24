import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import IonIcons from 'react-native-vector-icons/Ionicons';

const NewTags = () => {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const dateChange = (e, value) => {
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Nombre de la Categoria'
          autoCapitalize='none'
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
          <Text style={{ fontSize: 22, color: '#ababab', padding: 7 }}>Expiracion de Descuento</Text>
          {
            (!isPickerShow && Platform.OS === 'android') && (
              <Button title='Seleccionar fecha' color='#BFA658' onPress={() => setIsPickerShow(true)} />
            )
          }

          {
            (isPickerShow || Platform.OS === 'ios') && (
              <DateTimePicker
                testID="birthDate"
                value={formik.values.birthDate}
                style={{ width: '100%' }}
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

        <Pressable
          style={styles.btn}
        >
          <Text style={styles.btnText} >Guardar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default NewTags;

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