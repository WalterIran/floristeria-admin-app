import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, ActivityIndicator, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatter } from '../utils/formatter';
import React from 'react'

const TagResult = ({ tagName, desc, discount, tagId }) => {
    const navigation = useNavigation();


    const goToEdit =(id) => {
        navigation.navigate('EditTags', {tagId});
    }

    

    return (
        
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.section}>
                <Text style={styles.TagNombre}>Categoria: {tagName}</Text>
                <Text style={styles.text}>Descripcion: {desc}</Text>
                <View style={styles.line}></View>
                <Text>
                    <Text style={[styles.text]}>Descuento: </Text>
                    <Text style={[styles.precio, styles.text]}>{formatter.format(discount)}</Text>
                </Text>
            </View>
            <Pressable
                style={styles.btnEdit}
                onPress={() => goToEdit(tagId)}
            >
                <Text style={styles.btnEditText} >Editar</Text>
            </Pressable>
        </View>
        

    )
}

export default TagResult

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
    TagNombre: {
        fontSize: 22,
        fontWeight: '700'
    },
    text: {
        fontSize: 15,
        paddingVertical: 15
    },
    precio: {
        color: '#000',
        fontWeight: '700'
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