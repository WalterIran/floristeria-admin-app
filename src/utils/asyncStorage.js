import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (storageId,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(storageId, jsonValue)
    } catch (e) {
      // saving error
    }
}

export const getData = async (storageId) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageId)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

export const removeValue = async (storageId) => {
    try {
      await AsyncStorage.removeItem(storageId)
    } catch(e) {
      // remove error
    }
  }