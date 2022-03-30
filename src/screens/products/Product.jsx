import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView, Platform, Button, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectBox from 'react-native-multi-selectbox';

//Icons
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';
import Errors from '../../components/Errors';

const Product = ({formik, image, setImage, loading, tagOptions, selectedTags, onMultiChange}) => {
    const [ isPickerShown, setIsPickerShown ] = useState(false);
    const [errors, setErrors] = useState({});

    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const dateChange = (e, value) => {
        if(Platform.OS === 'android'){
          setIsPickerShow(false);
        }
        formik.setFieldValue('discountExpirationDate', value);
    }

    const chooseImg = async (opt) => {
        try {
            await requestPermission();
            if(status.status === 'granted'){
                const result = opt === 'gallery' ? await ImagePicker.launchImageLibraryAsync() : await ImagePicker.launchCameraAsync();
                if(!result.cancelled){
                    setImage(result);
                    const tempErr = errors;
                    delete tempErr['Imagen'];
                    setErrors({...tempErr})
                }
            }else{
                alert("Necesitas brindar permisos a la cámara");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <Wrapper>
        <ScrollView contentContainerStyle={styles.formContainer} nestedScrollEnabled={true}>
            <View style={styles.imgContainer}>
                {
                    image ? (
                        <View style={styles.imgContainerShowing}>
                            <Image
                                style={styles.image}
                                source={{uri: image.uri}}
                            />
                            <View style={[styles.imgOptions, {position: 'absolute', right: 0}]}>
                                <Pressable style={styles.imgOption} onPress={() => chooseImg('camera')}>
                                    <MaterialCommunityIcons name='camera-retake' size={32} color="#BFA658" />
                                </Pressable>
                                <Pressable style={styles.imgOption} onPress={() => chooseImg('gallery')}>
                                    <MaterialCommunityIcons name='image-edit' size={32} color="#BFA658" />
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.imgPlaceholder} >
                            <IonIcons name='cloud-upload-sharp' size={64} color="#BFA658" />
                            <Text style={{color:"#BFA658", fontWeight: 'bold'}}>Selecciona una imágen o toma una foto</Text>
                            <View style={styles.imgOptions}>
                                <Pressable style={styles.imgOption} onPress={() => chooseImg('camera')}>
                                    <MaterialIcons name='add-a-photo' size={32} color="#BFA658" />
                                </Pressable>
                                <Pressable style={styles.imgOption} onPress={() => chooseImg('gallery')}>
                                    <MaterialIcons name='add-photo-alternate' size={32} color="#BFA658" />
                                </Pressable>
                            </View>
                        </View>
                    )
                }
            </View>
            <TextInput
                style={styles.input}
                placeholder='Nombre del producto'
                value={formik.values.productName}
                onChangeText={(text) => formik.setFieldValue('productName', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Precio'
                keyboardType='numeric'
                value={formik.values.price}
                onChangeText={(text) => formik.setFieldValue('price', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Título de descripción'
                value={formik.values.productDescriptionTitle}
                onChangeText={(text) => formik.setFieldValue('productDescriptionTitle', text)}
            />
            <TextInput
                style={[styles.input, styles.multiline]} 
                placeholder='Descripción' 
                multiline 
                value={formik.values.productDescription}
                onChangeText={(text) => formik.setFieldValue('productDescription', text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Descuento'
                value={formik.values.discount}
                onChangeText={(text) => formik.setFieldValue('discount', text)}
            />
            <View style={{width: '100%', borderWidth: 1, borderColor: '#ababab', borderRadius: 16, padding: 16, marginBottom: 24}}>
                <Text style={{fontSize: 24, color: '#ababab'}}>Expiración del descuento</Text>
                {
                (!isPickerShown && Platform.OS === 'android') && (
                    <Button title='Seleccionar fecha' color='#BFA658' onPress={() => setIsPickerShown(true)}/>
                )
                }

                {
                (isPickerShown || Platform.OS === 'ios') && (
                    <DateTimePicker
                        testID="discountExpirationDate"
                        style={{width: '100%'}}
                        mode={Platform.OS === 'ios' ? 'datetime' : 'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        minimumDate={Date.parse(new Date())}
                        timeZoneOffsetInMinutes={60}
                        value={formik.values.discountExpirationDate}
                        onChange={dateChange}
                    />
                )
                }
            </View>
            <CustomSelect tagOptions={tagOptions} selectedTags={selectedTags} onMultiChange={onMultiChange} />

            <Errors errors={formik.errors} title='Errores de campos' />
            <Errors errors={errors} title='Mensajes del servidor' />
            <View style={{marginTop: 24, width: '100%'}}>
                <CustomButton text={"Guardar"} onPress={formik.handleSubmit}>
                    {loading && <ActivityIndicator />}
                </ CustomButton>
            </View>
        </ScrollView>
    </Wrapper>
    )
}

export default Product;

const CustomSelect = ({tagOptions, selectedTags, onMultiChange}) => {
    return(
        <View style={{flex: 1, width: '100%'}}>
            <SelectBox
                    label="Seleccione las etiquetas"
                    options={tagOptions}
                    selectedValues={selectedTags}
                    onMultiSelect={onMultiChange}
                    onTapClose={onMultiChange}
                    isMulti
                />
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: '5%',
        backgroundColor: "#fff",
    },
    imgContainer: {
        width: '100%',
        height: 300,
        marginBottom: 24,
        borderRadius: 12,
        borderColor: '#BFA658',
        borderStyle: 'dashed',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    multiline: {
        height: 175,
    },
    imgContainerShowing: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },  
    imgPlaceholder: {
        alignItems: 'center',
    },
    imgOptions: {
        flexDirection: 'row',
        marginTop: 16,
    },
    imgOption: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        marginHorizontal: 8,
        borderRadius: 22,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ababab',
        marginBottom: 24,
        height: 52,
        width: '100%',
        borderRadius: 12,
        paddingLeft: 12,
        fontSize: 24
    },
})