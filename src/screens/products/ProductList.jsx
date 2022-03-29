import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
//API
import axios from '../../api/axios';
const newstProductURL = '/products/newest';

//Components
import Wrapper from '../../components/Wrapper';
import SearchBar from '../../components/SearchBar';
import ProductResult from '../../components/ProductResult';

const ProductList = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['1%', '50%','80%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);
    
    const handleCloseSheet = () => bottomSheetRef.current.close();
    const handleOpenSheet = () => bottomSheetRef.current.snapToPosition('80%');

    const showProducts = async () => {
        try {
            const respNewest = await axios.get(newstProductURL, {params: {limit: 10}});
            setProducts(respNewest.data.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
    await showProducts();
    }, []);

  return (
    <Wrapper>
        <View style={[styles.container, {position: 'relative', paddingHorizontal: 0, paddingTop: 0}]}>
            <View style={styles.searchSection}>
                <SearchBar setProducts={setProducts} setLoading={setLoading} />
                <View style={styles.filterBtn}>
                    <Pressable onPress={handleOpenSheet}>
                        <IonIcon name='filter' size={24} />
                    </Pressable>
                </View>
            </View>
            <Pressable style={styles.addBtn} onPress={() => navigation.navigate('NewProduct')}>
                <IonIcon name='add' size={40} />
            </Pressable>
            <ScrollView contentContainerStyle={[styles.container]} scrollIndicatorInsets={{right: 1}}>
                <SafeAreaView style={{marginBottom: 20}}>
                    <View style={{flex: 1}}>
                    {
                        products.map((product) => {
                            return (
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
                        })
                    }
                    </View>
                </SafeAreaView>
            </ScrollView>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <Pressable onPress={handleCloseSheet}><Text>Awesome 🎉</Text></Pressable>
            </View>
          </BottomSheet>
        </View>
    </Wrapper>
  )
}

export default ProductList;

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