import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView,ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState,useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

//AXIOS
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Wrapper from '../../components/Wrapper';
import Errors from '../../components/Errors';
import * as Yup from 'yup';

const USER_FIND_URL = '/users/byemployeeid/'
const USER_UPT_URL = '/users/update-customer/';
const USER_ACT_URL = 'users/activate-user/';
const USER_INA_URL = 'users/inactivate-user/';
const USER_EMP_URL = 'users/role-employee/';
const USER_ADM_URL = 'users/role-admin/';
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

const EmployeeDetails = ({route}) => {   
    const navigation = useNavigation();  
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});  
    //Employee Parameters
    const { employeeId,personId,userName,userLastname,birthDate,phoneNumber,address,userStatus,userRole } = route?.params;
    //InputText
    const [data,setData] = useState(null);
    const [id,setId] = useState();
    const [name,setName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [phone,setPhone] = useState(null);
    const [place,setPlace] = useState(null);
    //DateTimePicker 
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    //Picker State 
    const [selectedState, setSelectedState] = useState(false);
    //CheckBox Status
    const [active, setActive] = useState(false);
    const [inactive, setInactive] = useState(false);


    const goBack = () =>{
        navigation.navigate("Employee");
    }
    const dateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const activeState = () =>{
        activateUser(),
        setActive(true),
        setInactive(false)
    }

    const inactiveState = () =>{
        InactivateUser(),
        setActive(false),
        setInactive(true)
    }

    const Status = () =>{
        if(userStatus == 'INA'){
            setActive(false);
            setInactive(true);
        }else if(userStatus == 'ACT'){
            setActive(true);
            setInactive(false);
        }else{
            setActive(false);
            setInactive(false);
        }

        if(userRole == 'admin'){
            setSelectedState(userRole);
        }else if(userRole == 'employee'){
            setSelectedState(userRole);
        }else{
            setSelectedState(null);
        }
    }
    const Role = () =>{
        if(selectedState == 'admin'){
            userRoleAdmin();
        }else if(selectedState == 'employee'){
            userRoleEmployee();
        }
    }
    const getEmployee =  async () =>{
        const response = await axiosPrivate.get(USER_FIND_URL+employeeId)
        .then(function (response){
            setData(response.data);
         })
         .catch(function (error){
           console.error(error);
         });
    }
    const values = {
        personId: id || '',
        userName: name || '',
        userLastname: lastName || '',
        birthDate: new Date(date) || '',
        phoneNumber: phone || '',
        address:place || '',
    }
    const updateEmployee = async () =>{
        try {
            validationSchema();
            setLoading(true);
            Role();
            const response = await axiosPrivate.patch(USER_UPT_URL+employeeId,
                JSON.stringify(values)
                )
            .then(function (response){
                setData(response.data);
                goBack();
             })
             .catch(function (error){
                if(!error?.response) {
                    setErrors({Servidor: 'Error en el servidor'});
                }
             });
             if(!response){
                setErrors({error: 'campos erroneos.'});
             }
             setLoading(false);
        } catch (error) {
            
        }
    }
    const activateUser = async ()=>{
        try {
            const reponse = await axiosPrivate.put(USER_ACT_URL+employeeId);
        } catch (error) {
            console.log(error);
        }
    }
    const validar = (value) =>{
        if(value === ''){
            setErrors({error: 'campos vacios.'});
        }else{
            setErrors(false);
        }
    }
    const InactivateUser = async ()=>{
        try {
            const reponse = await axiosPrivate.delete(USER_INA_URL+employeeId)
            .then(function (response){
                setData(response.data);
             })
             .catch(function (error){
                if(!error?.response) {
                    setErrors({Servidor: 'Error en el servidor'})
                }
                console.error(error);
             });
        } catch (error) {
            console.log(error);
        }
    }
    const userRoleEmployee = async ()=>{
        try {
            const reponse = await axiosPrivate.put(USER_EMP_URL+employeeId)
            .then(function (response){
                setData(response.data);
             })
             .catch(function (error){
                if(!error?.response) {
                    setErrors({Servidor: 'Error en el servidor'})
                }
                console.error(error);
             });
        } catch (error) {
            console.log(error);
        }
    }
    const userRoleAdmin = async ()=>{
        try {
            const reponse = await axiosPrivate.put(USER_ADM_URL+employeeId)
            .then(function (response){
                setData(response.data);
             })
             .catch(function (error){
                if(!error?.response) {
                    setErrors({Servidor: 'Error en el servidor'})
                }
                console.error(error);
             });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        (async()=>{
            try {
                await getEmployee();
                await Status();
                setDate(new Date(birthDate));
                setId(personId);
                setName(userName);
                setLastName(userLastname);
                setPhone(phoneNumber);
                setPlace(address);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])
    return( 
        <>
            {
                data !== null && !loading? (
                    <SafeAreaView style={styles.container}>    
                    <Wrapper>
                            <ScrollView >  
                            <View>
                                <Pressable 
                                    onPress={goBack} 
                                    style={styles.backBtn}
                                >
                                    <Ionicons name="arrow-back" size={32} color='#777' />
                                </Pressable>
                                <View style={styles.formContainer}>
                                    <Text style={styles.title}>Empleado: #{employeeId}</Text>
                                    <View style={styles.containerIcon}>
                                        <MaterialCommunityIcons style={styles.icon} name="account-edit"/>
                                    </View>
                                    <Text style={styles.text}>
                                        Aqui podras editar toda la información del empleado.
                                        Asegurate de ingresar todo correctamente.              
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Identidad'
                                        value={id}
                                        onChangeText={setId}
                                        onBlur={()=>validar(id)}
                                    />
                                    {id ? null : <Animatable.View duration={500} animation="fadeInLeft">
                                        <Text style={styles.validar}>Ingrese 13 digitos</Text>
                                    </Animatable.View> }
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Nombre'
                                        value={name}
                                        onChangeText={setName}
                                        onBlur={()=>validar(name)}
                                    />
                                    {name? null : <Animatable.View duration={500} animation="fadeInLeft">
                                        <Text style={styles.validar}>Ingrese solo caracteres</Text>
                                    </Animatable.View> }
                                    <TextInput 
                                        style={styles.input}
                                        placeholder='Apellido' 
                                        value={lastName}
                                        onChangeText={setLastName}      
                                        onBlur={()=>validar(lastName)}     
                                    />
                                    {lastName ? null : <Animatable.View duration={500} animation="fadeInLeft">
                                        <Text style={styles.validar}>Ingrese solo caracteres</Text>
                                    </Animatable.View> }
                                </View>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.dateText}> Fecha de nacimiento</Text>
                                    {show && (
                                        <DateTimePicker
                                            style={styles.picker}
                                            testID="birthDate"
                                            mode={mode}
                                            is24Hour={true}
                                            maximumDate={Date.parse(new Date())}
                                            minimumDate={Date.parse(new Date(1930, 0, 1))}
                                            timeZoneOffsetInMinutes={60}
                                            display='spinner'
                                            value={date}
                                            onChange={dateChange}
                                        />
                                    )}
                                </View>         
                                
                                <View style={styles.formContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Telefono' 
                                        value={phone}
                                        onChangeText={setPhone} 
                                        onBlur={()=>validar(phone)}           
                                    />
                                    {phone ? null : <Animatable.View duration={500} animation="fadeInLeft">
                                        <Text style={styles.validar}>Ingrese 8 digitos</Text>
                                    </Animatable.View> }
                                    <TextInput
                                        style={styles.inputArea}
                                        multiline={true}
                                        numberOfLines={5}
                                        placeholder='Dirección'
                                        value={place}
                                        onChangeText={setPlace}
                                        onBlur={()=>validar(place)}    
                                    />    
                                    {place? null : <Animatable.View duration={500} animation="fadeInLeft">
                                        <Text style={styles.validar}>Ingrese solo caracteres</Text>
                                    </Animatable.View> }
                                </View>
                                
                                <View style={styles.pickerView}>
                                        <Picker
                                            selectedValue={selectedState}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSelectedState(itemValue)
                                            }                       
                                        >
                                            <Picker.Item label="Seleccionar rol de usuario" value="" enabled={false}/>
                                            <Picker.Item label="Empleado" value="employee"  />
                                            <Picker.Item label="Administrador" value="admin" />
                                        </Picker>
                                </View>

                                <View style={styles.checkboxContainer}>
                                 <CheckBox
                                    title='Activo'
                                    center
                                    checked={active}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    onPress={activeState}                                    
                                ></CheckBox> 
                                    <CheckBox
                                        title='Inactivo'
                                        center
                                        checked={inactive}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        onPress={inactiveState}
                                    ></CheckBox>
                                </View>
                            </View>
                            <View style={styles.formContainer}>
                              <Errors errors={errors} title='Mensajes del servidor' />    
                            </View>         
                            
                            <Pressable
                                onPress={updateEmployee}
                                style={styles.btn}
                            >
                            <Text style={styles.btnText} >Actualizar</Text>
                            </Pressable>
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
        marginBottom: 25,
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
        marginVertical: 30,
        marginHorizontal: 40,

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
        fontSize: 90,
        color: '#BFA658',
        paddingVertical: 8
    },
    containerIcon:{

        borderColor: '#BFA658',
        borderRadius: 100,
        borderWidth: 5,
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
    },
    pickerView: {
        marginHorizontal: 40,
        height: 52,
        width: '80%',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 65
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginHorizontal: 60,
        marginTop: 40,
        marginBottom: 10
    },
    validar:{
        bottom: 20,
        color: "#777",
        fontSize: 15
    },
});