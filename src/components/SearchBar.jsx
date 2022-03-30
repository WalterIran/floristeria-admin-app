import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';

const SearchBar = ({setProducts, setLoading, setIsNext}) => {

    const handleSearch = async (e) => {
        const value = e.nativeEvent.text;
        if(value === '') return;
        setLoading(true);
        try {
            const response = await axios.get('/search/products',
                { params: {search: value}}
            );
            const products = response.data.products;
            setIsNext(false);
            setProducts([...products]);
        } catch {
            console.error(error);
            alert('Algo salió prueba luego...');
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={styles.searchContainer}>
        <IonIcons name='search-outline' color={'#ababab'} size={32} />
        <TextInput
            style={styles.input}
            placeholder='Ingrese su búsqueda...'
            onSubmitEditing={handleSearch}
            clearButtonMode='always'
        />
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        fontSize: 18,
        marginLeft: 8
    }
});