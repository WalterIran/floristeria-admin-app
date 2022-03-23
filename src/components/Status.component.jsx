import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const Status = ({msg, status}) => {
    const bgColor = {
        backgroundColor: status === 'none' ? '#ababab' : '#86EFAC'
    }
    const txtColor = {
        color: status === 'none' ? '#ababab' : '#86EFAC'
    }

  return (
      <>
        {msg !== 'Recibida' && <View style={[styles.statusLine, bgColor]}></View>}
        <View style={styles.statusContainer}>
            <View style={[styles.iconBg, bgColor]}>
                {status === 'done' && <AntIcon name="check" color={'#fff'} size={24} />}
                {
                    status === 'pending' &&
                    <ActivityIndicator 
                        size='small'
                        color="#fff"
                    />
                }
            </View>
            <Text style={[styles.statusDesc, txtColor]}>{msg}</Text>
        </View>
      </>
  )
}

export default Status;

const styles = StyleSheet.create({
    statusContainer: {
        alignItems: 'center'
    },
    iconBg: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    statusDesc: {
        fontSize: 12,
    },
    statusLine: {
        height: 4,
        width: 40,
    },
})