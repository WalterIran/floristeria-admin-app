import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, ActivityIndicator, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';


import axios from '../../api/axios';
const listTagsURL = '/tags/listTags';

import Wrapper from '../../components/Wrapper';
import TagResult from '../../components/TagResult';

const ViewTags = () => {
    const navigation = useNavigation();
    const  [tags, settags] = useState([]);
    const [loading,setLoading] = useState(false);
   

    const showtags = async () => {
        try {
         const resplistTags = await axios.get(listTagsURL);
            settags(resplistTags.data.tags);
        } catch (error){
        console.log(error);
        }
    }

    useEffect(async () => {
        await showtags();
        }, []);

    return (
        <Wrapper>
            <ScrollView contentContainerStyle={{paddingVertical: 32, paddingHorizontal: 16}}>      
             <SafeAreaView> 
            <View style={{flex: 1}}>
            {   
                tags.map((tag) => {
                    return (
                <TagResult
                key ={tag.tagId}
                tagId ={tag.tagId}
                Name = {tag.tagName}
                desc = {tag.tagDescription}
                discount = {tag.discount}
                />
                );
            })
        }
            </View>

            <Pressable
                    style={styles.btn}
                    onPress={() => navigation.navigate('NewTags')}>
                
                    <Text style={styles.btnText} >Nueva Categoria</Text>
                </Pressable>

            </SafeAreaView>
            </ScrollView>
        </Wrapper>
        
    )
}

export default ViewTags;

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
});