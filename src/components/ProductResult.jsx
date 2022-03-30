import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatter } from '../utils/formatter';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductResult = ({img, title, desc, price, productId, discount, onPress}) => {
    const navigation = useNavigation();

    const goTo = (screen) => {
        navigation.navigate(screen, {productId})
    }

    const priceStyle = {
        fontWeight: '700',
        color: discount > 0 ? '#aaa' :'#333',
        textDecorationLine: discount > 0 ? 'line-through' : 'none'
    }

  return (
      <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
        <View style={styles.productContainer}>
            <View style={styles.imgContainer}>
                <Image source={{uri: img}} style={styles.img} />
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{desc}</Text>
                <View style={styles.infoSection}>
                    <View style={styles.priceSection}>
                        {discount > 0 && (
                            <>
                                <Text style={styles.discount}>{formatter.format(discount)}</Text>
                                <Text> - </Text>
                            </>
                        )}
                        <Text style={priceStyle}>{formatter.format(price)}</Text>
                    </View>
                    <View style={styles.optSection}>
                        {/* <Pressable style={styles.option} onPress={() => goTo('ProductStatistics')}>
                            <MaterialCommunityIcons name='chart-bar' size={24} color="#BFA658" />
                        </Pressable> */}
                        <Pressable style={[styles.option, {marginLeft: 8}]} onPress={() => goTo('EditProduct')}>
                            <MaterialIcons name='edit' size={24} color="#BFA658" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
      </TouchableOpacity>
  )
}

export default ProductResult

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        borderBottomColor: "#888",
        borderBottomWidth: 1.5,
        paddingVertical: 10,
    },
    imgContainer: {
        width: 135,
        height: 135,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 12,
        overflow: 'hidden',
    },
    img: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    descContainer: {
        flex: 1,
        paddingHorizontal: 8,
        justifyContent: 'space-evenly'
    },
    title: {
        fontWeight: 'bold',
        color: '#BFA658',
        fontSize: 18,
    },
    desc: {
        color: "#666"
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    discount: {
        fontWeight: '700',
        color: '#333',
    },
    optSection: {
        flexDirection: 'row'
    },
    option: {
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
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