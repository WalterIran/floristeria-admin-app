import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, ActivityIndicator, Modal, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import "intl";
import "intl/locale-data/jsonp/en";
import Status from '../../components/Status.component';
import Detail from '../../components/OrderDetail.component';
import { useNavigation } from '@react-navigation/native';
import { formatter } from '../../utils/formatter';
import {Picker} from '@react-native-picker/picker';
import useAuth from '../../hooks/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const OrderDetail = ({route}) => {
  const navigation = useNavigation();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { billId } = route?.params;
  const [detail, setDetail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState();
  const [reload, setReload] = useState(false)
  const [orderStatus, setOrderStatus] = useState([
    {
      key: 'received',
      msg: 'Recibida',
      status: 'none'
    },
    {
      key: 'processing',
      msg: 'Procesando',
      status: 'none'
    },
    {
      key: 'shipping',
      msg: 'Enviando',
      status: 'none'
    },
    {
      key: 'completed',
      msg: 'Entregada',
      status: 'none'
    }
  ]);

  const updateStatus = async () => {
    const datos = {
      status: selectedState,
      employeeId: auth?.user?.id
    }

    try {
      const responseMsg = await axiosPrivate.put(`/orders/updatestatus/${billId}`,
        JSON.stringify(datos),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      .then(res =>{
        console.log(res.data);
        Alert.alert("Orden modificada", "La orden fue modificada con exito");
        setReload(true);
      })
      .catch(err => {
          console.log(err);
          Alert.alert("Error", "Error al modificar el estado");
      });
    } 
    catch (error) {
      console.log(error);
      Alert.alert("Error", "Ocurrio un error al modificar el estado de la orden");
    }
  }

  const clearStatus = () =>{
    for(let i = 0; i < orderStatus.length; i++){
      const newArr = orderStatus;
      newArr[i].status = 'none';
      setOrderStatus(newArr);
    }
  }

  useEffect(() => {
    ( async () => {
      try {
        const response = await axiosPrivate.get(`/orders/order-detail/${billId}`);
        const resOrderStatus = response.data.result.orderStatus;
        clearStatus();

        for(let i = 0; i < orderStatus.length; i++) {
          if(resOrderStatus === 'canceled') {
            break;
          }
          
          if(orderStatus[i].key === 'completed') {
            const newArr = orderStatus;
            newArr[i].status = 'done';
            setOrderStatus(newArr);
            break;
          } else if(orderStatus[i].key === resOrderStatus){
            const newArr = orderStatus;
            newArr[i].status = 'pending';
            setOrderStatus(newArr);
            break;
          }else{
            const newArr = orderStatus;
            newArr[i].status = 'done';
            setOrderStatus(newArr);
          }

        }
        setDetail(response.data.result);
        setReload(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload])
  
  return (
    <>
    {
      detail ? (
        <SafeAreaView style={styles.background}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.pickerView}>
                    <Picker
                        selectedValue={selectedState}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedState(itemValue)
                        }
                    >
                        <Picker.Item label="Seleccionar estado" value="" enabled={false} style={{color: 'gray'}}/>
                        <Picker.Item label="Preparando" value="processing" />
                        <Picker.Item label="Enviando" value="shipping" />
                        <Picker.Item label="Entregado" value="completed" />
                        <Picker.Item label="Cancelado" value="canceled" />
                    </Picker>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                      updateStatus();
                      setModalVisible(!modalVisible);
                    }
                  }
                >
                  <Text style={styles.textStyle}>Guardar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
            <ScrollView contentContainerStyle={{paddingVertical: 32, paddingHorizontal: 16}}>
              <View style={[styles.container, styles.shadow]}>
                  <View style={styles.section}>
                    <Text style={styles.orderNum}>Orden: #{`${billId}`.padStart(5,0)}</Text>
                    <View style={styles.line}></View>
                    <Text>
                      <Text style={[styles.text]}>Estado: </Text>
                    </Text>
                    <View style={styles.statusSection}>
                        {/* done, pending, none */}
                        <Status msg={orderStatus[0].msg} status={orderStatus[0].status}  />
                        <Status msg='Preparando' status={orderStatus[1].status} />
                        <Status msg='Enviando' status={orderStatus[2].status} />
                        <Status msg='Entregado' status={orderStatus[3].status} />
                    </View>
                    <Text style={[styles.text, {marginVertical: 1}]}>Fecha de Pago: {new Intl.DateTimeFormat('es-HN', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(detail.createdAt))}</Text>
                    <Text style={[styles.text, {marginVertical: 1}]}>Fecha de Entrega:  {new Intl.DateTimeFormat('es-HN', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(detail.deliveryDate))}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.orderNum}>Detalle de envio</Text>
                    <View style={styles.line}></View>
                    <Text style={[styles.text, {marginVertical: 1}]}>Recibe: {detail.destinationPersonName}</Text>
                    <Text style={[styles.text, {marginVertical: 1}]}>Telefono: {detail.destinationPersonPhone}</Text>
                    <Text style={[styles.text, {marginVertical: 1}]}>Dirección: {detail.destinationAddress}</Text>
                    <Text style={[styles.text, {marginVertical: 1}]}>Referencias: {detail.destinationAddressDetails}</Text>
                    <Text style={[styles.text, {marginVertical: 1}]}>Ciudad: {detail.city}</Text>
                    <Text style={[styles.text, {marginVertical: 1}]}>Dedicatoria: {detail.dedicationMsg}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.orderNum}>Tu compra</Text>
                    <View style={styles.line}></View>
                    <View style={{marginVertical: 12}}>
                      {
                        detail.bill_detail.map((item, index) => {
                          return (
                            <Detail key={item.productId} product={item.product.productName} cant={item.quantity} price={item.price} />
                          );
                        })
                      }
                    </View>
                    <View style={styles.totals}>
                      <Text style={styles.text}>Subtotal</Text>
                      <Text style={styles.text}>{formatter.format(detail.subtotal)}</Text>
                    </View>
                    <View style={styles.totals}>
                      <Text style={styles.text}>ISV</Text>
                      <Text style={styles.text}>{formatter.format(detail.taxAmount)}</Text>
                    </View>
                    <View style={styles.totals}>
                      <Text style={styles.text}>TOTAL</Text>
                      <Text style={styles.text}>{formatter.format(detail.total)}</Text>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Pressable
                      style={styles.btn}
                      onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.btnText} >Editar estado</Text>
                    </Pressable>
                  </View>
              </View>
            </ScrollView>
        </SafeAreaView>
      ) : (
        <ActivityIndicator />
      )
    }
    </>
  )
}

export default OrderDetail;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 24,
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
  orderNum: {
    fontSize: 24,
    fontWeight: '700'
  },
  line: {
    width: '100%',
    backgroundColor: '#000',
    height: 1,
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
  },
  status: {
    color: '#86EFAC'
  },
  statusSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 12
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    backgroundColor: '#BFA658',
    fontSize: 24,
    height: 55,
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
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 300
  },
  buttonClose: {
    backgroundColor: "#BFA658",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  pickerView: {
      borderWidth: 1,
      borderColor: '#ababab',
      marginBottom: 24,
      height: 52,
      width: 300,
      borderRadius: 12,
      paddingLeft: 12,
      justifyContent: 'center'
  }
})