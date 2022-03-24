import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

const Wrapper = ({children}) => {
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding': 'height'}
        style={styles.container}
    >
        <StatusBar 
            animated={true}
            barStyle={'dark-content'}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}



export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})