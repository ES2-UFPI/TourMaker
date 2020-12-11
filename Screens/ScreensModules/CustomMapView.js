import React, { Component } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid} from 'react-native';
import MapView from 'react-native-maps'
import Permissions from '../../APIs/Permissions'
class CustomMapView extends Component{
    state ={
        region: null,
        userLocationPermission: false
    }

    onRegionChange = (region) => {
        this.setState ({ region });
    }
    onUserLocationChange = (location) => {
        let UserCoords = location.nativeEvent.coordinate
        if(!this.state.userFlag){
            this.setState({
                userFlag: true,
                region:{
                    latitude: UserCoords.latitude,
                    latitudeDelta: 0.05,
                    longitude: UserCoords.longitude,
                    longitudeDelta: 0.05,
                }
            })
        }
    }
    callbackPermissionLocation = (status) => {
        console.log(status)
        if(status != "granted"){
            alert("Permissão de localização não foi concedida!")
        }
        else{
            this.setState(
                {userLocationPermission: true}
            )
        }
    }
    componentDidMount(){

        Permissions.verifyLocationPermission(this.callbackPermissionLocation)
    }
    render(){
        return(
            <View style={styles.CustomMapView}>
                <MapView
                style={styles.map}
                onRegionChangeComplete={this.onRegionChange}
                region={this.state.region}
                onUserLocationChange={this.onUserLocationChange}
                showsUserLocation={this.state.userLocationPermission}
                followsUserLocation={this.state.userLocationPermission}
                ></MapView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    CustomMapView: {
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: 400
    },
    map: {
        width:'100%',
        height:'100%',
    }
  });
export default CustomMapView