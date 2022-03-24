import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Picker} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState,useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const EmployeeDetails = () => {   
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [select, setSelect] = useState(null);


    const goBack = () =>{
        navigation.navigate("Employee");
    }

    const showDatePicker = () => {
        setDate(true);
        showMode('date');
      };

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };



    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>      
            <Pressable 
                onPress={goBack} 
                style={styles.backBtn}
            >
                <Ionicons name="arrow-back" size={32} color='#777' />
            </Pressable>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Empleado: #12345</Text>
                <View style={styles.containerIcon}>
                    <Ionicons style={styles.icon} name="person"/>
                </View>
                <Text style={styles.text}>
                    Aqui podras editar toda la información del empleado.
                    Asegurate de ingresar todo correctamente.                  
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Identidad'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                />
                <TextInput 
                    style={styles.input}
                    placeholder='Apellido'                 
                />
             </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}> Fecha de nacimiento</Text>
                {show && (
                    <DateTimePicker
                        style={styles.picker}
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        maximumDate={Date.parse(new Date())}
                        minimumDate={Date.parse(new Date(1930, 0, 1))}
                        timeZoneOffsetInMinutes={60}
                        display='spinner'
                        onChange={onChange}
                        />
                )}
            </View>         
            
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Telefono'                
                />
                <TextInput
                    style={styles.inputArea}
                    multiline={true}
                    numberOfLines={5}
                    placeholder='Dirección'
                />

            </View>
            
            <Pressable
                onPress={goBack}
                style={styles.btn}
            >
            <Text style={styles.btnText} >Actualizar</Text>
            </Pressable>
     
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default EmployeeDetails;
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
        paddingLeft: 30,
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
    },
    dateContainer:{
        width: '80%',
        marginHorizontal: 40,
        borderColor: '#ababab',
        borderWidth: 1,
        borderRadius: 20,
        height: 270,
        marginBottom: 15,
    },
    picker:{
        marginTop: 10
    },
    dateText:{
        fontSize: 20,
        color: "#ababab",
        paddingHorizontal: 15,
        paddingTop: 10,
    }
});

/*
<Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedCity(itemValue)
                }
                >
                <Picker.Item label="Rol de Usuario" value="user_rol" enabled={false} style={{color: 'gray'}}/>
                <Picker.Item label="Administrador" value="admin" />
                <Picker.Item label="Empleado" value="employee" />
            </Picker>
*/