import { StyleSheet, ActivityIndicator, SafeAreaView, Platform, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

//Components
import Order from '../../components/Order.component';

//API
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
const LIMIT = 5;
let PAGE = 1;

const PendingOrdersScreen = () => {
  const navigation = useNavigation();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ isNext, setIsNext ] = useState(false);

  const goToOrderDetail = (billId) => {
    navigation.navigate('OrderDetail', {billId});
  }

  useEffect(() => {
    ( async () => {
      await loadOrders();
    })();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await axiosPrivate.get(`orders/pending?limit=${LIMIT}&page=${PAGE}`);
      setOrders([...orders, ...response.data.orders]);
      if(response.data.pagination.nextPage !== null){
        PAGE = response.data.pagination.nextPage;
        setIsNext(true);
      }else{
        setIsNext(false)
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <SafeAreaView>
      {
        orders.length !== 0 ? (
          <FlatList 
            data={orders}
            numColumns={1}
            keyExtractor={(order, index) => String(order.billId)}
            renderItem={({item}) => <Order {...item} goTo={goToOrderDetail} />}
            contentContainerStyle={styles.flatListContentContainer}
            onEndReached={isNext && loadOrders}
            onEndReachedThreshold={0}
            ListFooterComponent={
              isNext && (
                  <ActivityIndicator 
                      size="large"
                      styles={styles.spinner}
                      color="#aeaeae"
                  />
              )
            }
          />
        ) : (
          <ActivityIndicator />
        )
      }
    </SafeAreaView>
  )
}

export default PendingOrdersScreen;

const styles = StyleSheet.create({
  flatListContentContainer: {
      paddingHorizontal: 5,
      marginTop: Platform.OS === 'android' ? 30 : 0,
  },
});