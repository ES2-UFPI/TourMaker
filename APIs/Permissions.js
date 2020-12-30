import * as Per from 'expo-permissions';



export default class Permissions {
    static verifyLocationPermission = async (callback) =>{
        const {status,permissions} = await Per.askAsync(Per.LOCATION);
        callback(status)
    }
};