import { StyleSheet, Text, View } from 'react-native'

const Errors = ({errors, title}) => {
  return (
      <>
      {
        (Object.keys(errors).length > 0) && (
            <View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>{title}</Text>
                {
                    Object.keys(errors).map((err, index) => {
                        return (
                            <Text key={index} style={styles.errorDesc}>{err}: {errors[err]}</Text>
                        );
                    })
                }
            </View>
        )
      }
      </>
  );
}

export default Errors

const styles = StyleSheet.create({
    errorContainer: {
        marginVertical: 8,
    },
    errorTitle: {
        color: 'red',
        fontWeight: '700'
    },  
    errorDesc: {
        color: 'red'
    },  
})