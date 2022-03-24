import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView} from 'react-native';

//Components
import Wrapper from '../../components/Wrapper';

const Employee = () => {   
    const navigation = useNavigation();

    const goToEmployeeDetails = () =>{
        navigation.navigate("EmployeeDetails");
    }
    const goToNewEmployee = () =>{
        navigation.navigate("NewEmployee");
    }
    return(
        <Wrapper>
            <ScrollView contentContainerStyle={{paddingVertical: 32, paddingHorizontal: 16}}>      
             <SafeAreaView> 
          
                    <View style={[styles.container, styles.shadow]}>
                        <View style={styles.section}>
                            <Text style={styles.employeeID}>Codigo del Empleado: #12345</Text>
                            <Text style={styles.text}>Nombre: David Chávez</Text>
                            <View style={styles.line}></View>
                            <Text>
                                <Text style={[styles.text]}>Estado: </Text>
                                <Text style={[styles.statuActive, styles.text]}>Activo</Text>
                            </Text>
                        </View>
                        <Pressable
                            style={styles.btnEdit}
                            onPress={goToEmployeeDetails}
                        >
                            <Text style={styles.btnEditText} >Editar</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.container, styles.shadow]}>
                        <View style={styles.section}>
                            <Text style={styles.employeeID}>Codigo del Empleado: #54321</Text>
                            <Text style={styles.text}>Nombre: Jorge Ayala</Text>
                            <View style={styles.line}></View>
                            <Text>
                                <Text style={[styles.text]}>Estado: </Text>
                                <Text style={[styles.statuInactive, styles.text]}>Inactivo</Text>
                            </Text>
                        </View>
                        <Pressable
                            style={styles.btnEdit}
                            onPress={goToEmployeeDetails}
                        >
                            <Text style={styles.btnEditText} >Editar</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.container, styles.shadow]}>
                        <View style={styles.section}>
                            <Text style={styles.employeeID}>Codigo del Empleado: #13579</Text>
                            <Text style={styles.text}>Nombre: Walter Iran</Text>
                            <View style={styles.line}></View>
                            <Text>
                                <Text style={[styles.text]}>Estado: </Text>
                                <Text style={[styles.statuActive, styles.text]}>Activo</Text>
                            </Text>
                        </View>
                        <Pressable
                            style={styles.btnEdit}
                            onPress={goToEmployeeDetails}
                        >
                            <Text style={styles.btnEditText} >Editar</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.container, styles.shadow]}>
                        <View style={styles.section}>
                            <Text style={styles.employeeID}>Codigo del Empleado: #24680</Text>
                            <Text style={styles.text}>Nombre: Jorge Salgado</Text>
                            <View style={styles.line}></View>
                            <Text>
                                <Text style={[styles.text]}>Estado: </Text>
                                <Text style={[styles.statuInactive, styles.text]}>Inactivo</Text>
                            </Text>
                        </View>
                        <Pressable
                            style={styles.btnEdit}
                            onPress={goToEmployeeDetails}
                        >
                            <Text style={styles.btnEditText} >Editar</Text>
                        </Pressable>
                    </View>
                <Pressable
                    style={styles.btn}
                    onPress={goToNewEmployee}
                >
                    <Text style={styles.btnText} >Nuevo Empleado</Text>
                </Pressable>
        
        </SafeAreaView>
        </ScrollView>
        </Wrapper>
    )
}

export default Employee;

const styles = StyleSheet.create({
      container: {
        width: '100%',
        height: 240,
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginVertical: 15
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
        fontWeight: '700'
      },
      text: {
        fontSize: 20,
        paddingVertical: 15
      },
      statuActive: {
        color: '#BFA658'
      },
      statuInactive: {
        color: '#777'
      },
      statusSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 12
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
      btnEdit: {
        backgroundColor: '#BFA658',
        fontSize: 24,
        height: 40,
        width: '30%',
        justifyContent: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
      },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginVertical: 10
      },
      btnEditText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});