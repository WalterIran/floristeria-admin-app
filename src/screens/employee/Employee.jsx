import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView,Button,ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Components
import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const USER_ALL_URL ='/users/all-employee';
const USER_DEL_URL = 'users/delete-user/';

const Employee = () => {   
    const navigation = useNavigation();
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const goToEmployeeDetails = (employeeId,personId,userName,userLastname,birthDate,phoneNumber,address,userStatus,userRole) =>{
        navigation.navigate("EmployeeDetails",{employeeId,personId,userName,userLastname,birthDate,phoneNumber,address,userStatus,userRole});
    }
    const goToNewEmployee = () =>{
        navigation.navigate("NewEmployee");
    }

    const getEmployee = async () => {
      setLoading(true);
      const response = await axios.get(USER_ALL_URL)
       .then(function (response){
          setData(response.data);
       })
       .catch(function (error){
         console.error(error);
       });
       setLoading(false);
    }
    const deleteUser = async (id) =>{
      try {
          const response = await axiosPrivate.delete(USER_DEL_URL+id);
          if(response.data.deleteCount === 1){
            const detail = data.filter( (value) => {
              return value.productId !== id
            });
            setData([...detail]);
          }
          getEmployee();
      } catch (error) {
          console.log(error);
      }
  }
    useEffect(() => {
      getEmployee();
      const unsub = navigation.addListener('focus', getEmployee);
      return unsub;
    }, [navigation]);
  
  
    return(     
      <ScrollView contentContainerStyle={{paddingVertical: 32, paddingHorizontal: 16}}> 
      <Button title='Refrescar' onPress={getEmployee} />
      {
        data !== null && !loading ? (
          <SafeAreaView>  
          {data.length === 0 && <Text style={{textAlign:'center'}}>No hay ningun emeplado</Text>}
            {
              data.map((employee,index)=>{
                  return (
                    <View key={employee.id} style={[styles.container, styles.shadow]}>
                        <View style={styles.section}>
                            <Text  style={styles.employeeID}>Codigo del Empleado: {employee.id}</Text>
                            <Text style={styles.text}>Nombre: {employee.userName+' '+employee.userLastname}</Text>
                            {
                              employee.userRole == 'admin' && <Text style={styles.text}>Rol de usuario: Administrador</Text>
                            }
                            {
                              employee.userRole == 'employee' && <Text style={styles.text}>Rol de usuario: Empleado</Text>
                            }
                            <Text style={[styles.text]}>
                                <Text>Estado: </Text>
                                {
                                  employee.userStatus == 'ACT' && <Text style={[styles.statuActive, styles.text]}>Activo</Text>
                                }
                                {
                                  employee.userStatus == 'INA'  && <Text style={[styles.statuInactive, styles.text]}>Inactivo</Text>
                                }
                            </Text>
                           
                        </View>
                        <View style={styles.containerBtn}>
                          <Pressable
                              style={styles.btnEdit}
                              onPress={() => goToEmployeeDetails(employee.id,employee.personId,employee.userName,employee.userLastname,employee.birthDate,employee.phoneNumber,employee.address,employee.userStatus,employee.userRole)}   
                          >
                              <MaterialCommunityIcons name="account-edit" size={35} color='#BFA658' />
                          </Pressable>
    
                          <Pressable
                              style={styles.btnDelete}
                              onPress={() => deleteUser(employee.id)} 
                          >
                              <MaterialCommunityIcons name="delete" size={30} color='#BFA658' />
                              {loading && <ActivityIndicator size='small' color="#fff"/>}
                          </Pressable>
                        </View>
                    </View>
             );
            })
          } 
            <Pressable
              style={styles.btn}
              onPress={goToNewEmployee}

            >
              <Text style={styles.btnText} >Nuevo Empleado</Text>
            </Pressable>
      </SafeAreaView>
        ) : (
          <ActivityIndicator />
        )
      }
      </ScrollView>
    )
}

export default Employee;

const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginVertical: 15,
      },
      section: {
        marginVertical: 8
      },
      shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      employeeID: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10
      },
      text: {
        fontSize: 20,
        marginVertical: 10
      },
      statuActive: {
        color: '#86EFAC'
      },
      statuInactive: {
        color: '#DC143C'
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
      containerBtn:{
        flexDirection: 'row',

      },
      btnEdit:{
        marginLeft:200,
        backgroundColor: '#fff',
        fontSize: 24,
        height: 45,
        width: '15%',
        justifyContent: 'center',
        borderRadius: 50,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
      },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        paddingHorizontal: 5,
      },
      btnDelete:{
        marginHorizontal:"5%",
        backgroundColor: '#fff',
        fontSize: 24,
        height: 45,
        width: '15%',
        justifyContent: 'center',
        borderRadius: 50,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
      },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        paddingHorizontal: 7,
      }
});