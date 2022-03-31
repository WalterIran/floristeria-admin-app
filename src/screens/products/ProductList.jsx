import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, RefreshControl, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';

//API
import axios from '../../api/axios';
const productsURL = '/products/all';

//Components
import Wrapper from '../../components/Wrapper';
import SearchBar from '../../components/SearchBar';
import ProductResult from '../../components/ProductResult';
import { FlatList } from 'react-native-gesture-handler';

const LIMIT = 10;
let PAGE = 1;

const ProductList = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ isNext, setIsNext ] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
      try {
        setRefreshing(true);
        setProducts([]);
        PAGE = 1;
        await showProducts();
      } catch (error) {
        console.log(error);
      }
    }, []);

    const showProducts = async () => {
        try {
            const res = await axios.get(productsURL, {params: {limit: LIMIT, page: PAGE}});
            
            setProducts([...products, ...res.data.products]);

            if(res.data.pagination.nextPage !== null){
              PAGE = res.data.pagination.nextPage;
              setIsNext(true);
            }else{
              setIsNext(false);
            }
            
            setRefreshing(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      (async () => {
        await showProducts();
      })();

      return() => {
        setProducts([]);
      }
    }, []);

  return (
    <Wrapper>
        <View style={[styles.container, {position: 'relative', paddingHorizontal: 0, paddingTop: 0}]}>
            <View style={styles.searchSection}>
                <SearchBar setProducts={setProducts} setLoading={setLoading} setIsNext={setIsNext} />
            </View>
            <Pressable style={styles.addBtn} onPress={() => navigation.navigate('NewProduct')}>
                <IonIcon name='add' size={40} />
            </Pressable>
            <SafeAreaView style={styles.container}>
              
              <FlatList
                data={products}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={isNext && showProducts}
                contentContainerStyle={[styles.container, {marginBottom: 80}]}
                onEndReachedThreshold={0}
                refreshControl={
                  <RefreshControl 
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListFooterComponent={
                  isNext ? (
                    <ActivityIndicator 
                        size="large"
                        styles={styles.spinner}
                        color="#aeaeae"
                    />
                  ) : (
                    <View style={{height: 80, width: '100%'}}></View>
                  )
                }
                ListFooterComponentStyle={{marginBottom: 150}}
              />
            </SafeAreaView>
        </View>
    </Wrapper>
  )
}

export default ProductList;

const renderItem = ({item: product}) => {
  return(
    <ProductResult
        key={product.id}
        productId={product.id}
        img={product.productImgUrl} 
        title={product.productName}
        desc={product.productDescriptionTitle}
        price={product.price}
        discount={defineDiscount(product.price, product.discount, product.discountExpirationDate, product.product_tag)}
        onPress={() => navigation.navigate('EditProduct', {prodId: product.id})}
    />
  );
}

const defineDiscount = (prodPrice, prodDiscount, prodExpDate, prodTags) => {
    let discount = 0;
    const tagDiscounts = prodTags.filter(tag => {
      
      if(new Date(tag.tag.discountExpirationDate) > new Date() && tag.tag.discount !== null){
        
        return tag.tag.discount;
      }
    }).map(item => item.tag.discount);

    const maxTagDiscount = Math.max(...tagDiscounts);
    
    prodDiscount = prodDiscount || 0;
    
    if(prodExpDate === null && maxTagDiscount === 0) {
      discount = 0;
    }else{

      if(prodExpDate === null && maxTagDiscount !== 0){
        discount = maxTagDiscount;
      }else{
        if(prodDiscount > maxTagDiscount){
          discount = prodDiscount;
        }else{
          discount = maxTagDiscount;
        }
      }  
    }
    discount /= 100;
    if(discount > 0){
      return prodPrice - (prodPrice * discount);
    }


    return 0;
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexGrow: 1,
    },
    searchSection: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        top: 10,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2
    },
    filterBtn: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 16,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addBtn: {
        width: 64,
        height: 64,
        backgroundColor: "#fff",
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        position: 'absolute',
        bottom: 80,
        right: 20,
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