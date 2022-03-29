import { useState, useEffect } from 'react';
import Product from "./Product";
import { useNavigation } from '@react-navigation/native';

import { useFormik } from 'formik';
import * as Yup from 'yup';

//API
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const NewProduct = () => {
    const [ image, setImage ] = useState(null);
    const [ tagOptions, setTagOptions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigation = useNavigation();

    const initialValues = {
        productName: '', 
        productDescriptionTitle: '', 
        productDescription: '',
        price: 0.00, 
        discount: 0.00, 
        discountExpirationDate: new Date()
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (formValues) => {
            setLoading(true);
            try {
                if(!image){
                    setErrors({Imagen: 'Debe seleccionar una imagen de su galería'});
                    return;
                }
                const formData = new FormData();
                const keys = Object.keys(formValues).filter(key => formValues[key] !== '');
                
                keys.forEach(key => {
                    formData.append(key, formValues[key].toString());
                });
                
                formData.append('productImage',{
                    name: new Date() + '_prodImg',
                    uri: image.uri,
                    type: image.type+`/${image.uri.split('.')[1]}`
                });

                let tagIdArr = selectedTags.map((tag) =>  tag.id);
                formData.append('tagIds', JSON.stringify(tagIdArr));

                const result = await axiosPrivate.post(
                    `/products/create`,
                    formData,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                        transformRequest: (data, headers) => {
                            return formData;
                        }
                    }
                );
                alert("Producto guardado con éxito");
                navigation.goBack();
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
    });

    const getTags = async () => {
        try {
            const result = await axiosPrivate.get('/tags/listtags');
            const tags = result.data;
            const opts = tags.map(tag => {
                return {
                    item: tag.tagName,
                    id: tag.tagId
                }
            });
            setTagOptions(opts);
        } catch (error) {
            alert('Algo salió mal, intenta de nuevo más tarde');
        }
    }

    useEffect(() => {
        getTags();
        return() => {
            setTagOptions([]);
            setSelectedTags([]);
            setImage(null);
        }
    }, []);

    function onMultiChange(item) {
        const index = selectedTags.map(tag => tag.id).indexOf(item.id);

        const tempArr = selectedTags;
        
        if(index > -1){
            tempArr.splice(index, 1);
        }else{
            tempArr.push(item);
        }

        setSelectedTags([...tempArr]);
    }

  return (
    <Product 
        formik={formik}
        image={image}
        setImage={setImage}
        loading={loading}
        tagOptions={tagOptions}
        selectedTags={selectedTags}
        onMultiChange={onMultiChange}
    />
  )
}

export default NewProduct;

const validationSchema = {
    productName: Yup.string().required('Campo requerido'), 
    productDescriptionTitle: Yup.string().required('Campo requerido'), 
    productDescription: Yup.string().required('Campo requerido'),
    price: Yup.number('Campo debe ser un número').required('Campo requerido'), 
    discount: Yup.number('Campo debe ser un número'), 
    discountExpirationDate: Yup.string()
}