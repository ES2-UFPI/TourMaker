import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class CustomMapView extends Component{
    render(){
        return(
            <View style={styles.CustomMapView}>
                <Text>Mapa a ser implementado</Text>
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
  });
export default CustomMapView