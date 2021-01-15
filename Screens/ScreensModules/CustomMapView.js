import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Permissions from '../../APIs/Permissions'
import ReactMaps from '../../APIs/ReactMaps'

class CustomMapView extends Component{
    constructor(props){
        super(props)
        var height = 400
        if(props.style !== undefined){
            height = props.style.height
        }
        var markers = props.markers !== undefined ? props.markers : []
        this.state ={
            mapHeight: height,
            markers: markers,
            region: null,
            userLocationPermission: false,
            PDIPerUserLocation: []
        }
    }

    onRegionChange = (region) => {
        this.setState ({ region });
    }

    onUserLocationChange = (location) => {
        let UserCoords = location.nativeEvent.coordinate
        var locationAntigo = null
        var diferencaAceitavel = 0.0001
        if(this.state.region !== null){
            locationAntigo = {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
            }
        }
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
        var variLatitude = 1, variLongitude = 1
        if(this.state.region !== null){
            variLatitude = (UserCoords.latitude - locationAntigo.latitude)
            variLatitude = variLatitude >= 0 ? variLatitude : -variLatitude
            variLongitude = (UserCoords.longitude - locationAntigo.longitude)
            variLongitude = variLongitude >= 0 ? variLongitude : -variLongitude
        }
        if(
            this.props.useUserLocation == true &&
            variLatitude > diferencaAceitavel &&
            variLongitude > diferencaAceitavel
        ){
            this.useUserLocation({
                latitude: UserCoords.latitude,
                longitude: UserCoords.longitude,
            })
        }
    }

    useUserLocation = (location)=>{
        ReactMaps.getNearbyLocation(location.latitude, location.longitude, 200, (result) => {
            this.setState({
                PDIPerUserLocation: result
            })
        })
    }

    callbackPermissionLocation = (status) => {
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
        const style = StyleSheet.create({
            CustomMapView: {
              backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: this.state.mapHeight
            }
        })
        return(
            <View style={style.CustomMapView}>
                <MapView
                style={styles.map}
                onRegionChangeComplete={this.onRegionChange}
                region={this.state.region}
                onUserLocationChange={this.onUserLocationChange}
                showsUserLocation={this.state.userLocationPermission}
                followsUserLocation={this.state.userLocationPermission}
                >
                    {this.state.markers.map((marker)=>{
                        return(
                            <Marker
                                key={marker.placeId}
                                coordinate={{
                                    latitude: marker.coordinate.latitude,
                                    latitudeDelta: 0.05,
                                    longitude: marker.coordinate.longitude,
                                    longitudeDelta: 0.05,
                                }}
                                title={marker.placeName}
                            />
                        )
                    })}
                    {this.state.PDIPerUserLocation.map((marker)=>{
                        return(
                            <Marker
                                key={marker.placeId}
                                pinColor="blue"
                                coordinate={{
                                    latitude: marker.coordinate.latitude,
                                    latitudeDelta: 0.05,
                                    longitude: marker.coordinate.longitude,
                                    longitudeDelta: 0.05,
                                }}
                                title={marker.placeName}
                            />
                        )
                    })}
                </MapView>
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