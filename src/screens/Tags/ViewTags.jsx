import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, ScrollView, Pressable, RefreshControl, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';

import axios from '../../api/axios';
const listTagsURL = '/tags/listTags';

import Wrapper from '../../components/Wrapper';
import TagResult from '../../components/TagResult';

const ViewTags = () => {
    const navigation = useNavigation();
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        await showtags();
    }, []);

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        showtags();
    }, []);

    const showtags = async () => {
        try {
            setLoading(true);
            const resplistTags = await axios.get(listTagsURL);
            setTags(resplistTags.data);
            //console.log(resplistTags.data[0].tagName);
            //console.log(tags[0]);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <Wrapper>
            <ScrollView style={{width: '100%'}} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>

                <SafeAreaView>
                    <View style={{ flex: 1 }}>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <TagResult
                                        key={tag.tagId}
                                        tagId={tag.tagId}
                                        tagName={tag.tagName}
                                        tagDescription={tag.tagDescription}
                                        discount={tag.discount}
                                        discountExpirationDate={tag.discountExpirationDate}


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

    );
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
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
});