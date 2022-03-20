import { Pressable, Text, ActivityIndicator } from 'react-native';
import React from 'react'

const CustomButton = ({customBtnStyle, customTxtStyle, text, onPress, children}) => {

    const btnStyle = {
        backgroundColor: customBtnStyle?.backgroundColor || '#BFA658',
        fontSize: customBtnStyle?.fontSize || 24,
        height: customBtnStyle?.height || 60,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 12,
        color: '#fff',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }

    const btnText = {
        color: customTxtStyle?.color || '#fff',
        textAlign: customTxtStyle?.textAlign || 'center',
        fontSize: customTxtStyle?.fontSize || 24,
    }


    return (
        <Pressable style={btnStyle} onPress={onPress}>
            <Text style={btnText}>{text}</Text>
            {children}
        </Pressable>
    )
}

export default CustomButton;