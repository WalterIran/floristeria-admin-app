import { StyleSheet, Text, View, Pressable } from 'react-native'
import "intl";
import "intl/locale-data/jsonp/en";

const Order = ({billId, createdAt = new Date(), deliveryDate = new Date(), goTo}) => {
  
  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.title}>Pedido: #{`${billId}`.padStart(5,0)}</Text>
      <Text style={styles.dates}>Fecha de pago: {new Intl.DateTimeFormat('es-HN', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(createdAt))}</Text>
      <Text style={styles.dates}>Fecha de entrega: {new Intl.DateTimeFormat('es-HN', {dateStyle: 'medium', timeStyle: 'short'}).format(new Date(deliveryDate))}</Text>
      <Pressable
        style={[styles.btn, styles.shadow]}
        onPress={() => goTo(billId)}
      >
          <Text style={styles.btnText}>Detalles</Text>
      </Pressable>
    </View>
  )
}

export default Order;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: "#fff",
        width: '100%',
        maxWidth: 400,
        marginVertical: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    dates: {
        fontSize: 14,
        color: '#444',
    },
    btn: {
        marginTop: 12,
        backgroundColor: '#86EFAC',
        borderRadius: 20,
        paddingHorizontal: 32,
        paddingVertical: 8,
        width: 128,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff'
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
});