import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, ActivityIndicator, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';


const ViewTags = () => {

    const navigation = useNavigation();

    const goTotags = () => {
        navigation.navigate('NewTags');
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.containerTitles}>
                    <Text style={styles.title}>Lista de Categorias</Text>
                </View>

                <FlatList/>
                <Pressable style={styles.btn} onPress={goTotags}>
                    <Text style={styles.btnText} >Nueva Tag</Text>
                </Pressable>

            </View>
        </SafeAreaView>
    )
}

export default ViewTags;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    formContainer: {
        width: '100%',
        marginVertical: 16,
        paddingHorizontal: '10%',
        justifyContent: 'center'
        
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerTitles: {
        borderBottomColor: '#BFA658',
        borderBottomWidth: 2,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        marginVertical: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ababab',
        marginBottom: 24,
        height: 52,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 12,
        fontSize: 18,
    },
    btn: {
        backgroundColor: '#BFA658',
        fontSize: 24,
        height: 60,
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
        marginBottom:30
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
    },
    
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === 'android' ? 30 : 0,
      
    }


});