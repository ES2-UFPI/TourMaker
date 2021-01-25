import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AsyncStorageFunctions {
    static exempleFunction = () =>{
        console.log('Essa aqui é um exemplo de função da API')
    }

    static storeData = async(Value, Chave) => {
        try{
            const jsonValue = JSON.stringify(Value)
            await AsyncStorage.setItem(Chave,jsonValue)
        }catch(e){

        }
    }
    static retrieveData = async(Chave, callback) => {
        try{
            await AsyncStorage.getItem(Chave).then((value) => {
                callback(value)
            })
        }catch(e){

        }
    }
};