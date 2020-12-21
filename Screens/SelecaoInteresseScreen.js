import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomButton from './ScreensModules/CustomButton';
import CustomMapView from './ScreensModules/CustomMapView';
import ReactMaps from '../APIs/ReactMaps';


class SelecaoInteresseScreen extends Component{
    render(){
        console.log(this.props.route.params)
        const mostrarPDIs = {
            exemp: ''
        }
        return(
            <View style={styles.SelecaoInteresseScreen}>
                <CustomMapView/>
                <Text>Tela de mostrar PDIs proximos no mapa</Text>
                <Text>Mapa com sua localização atual e PDIs proximos (A implementar)</Text>
                
                <CustomButton
                    title="Aceitar PDIs"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    SelecaoInteresseScreen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    Buttons:{
        color: '#1abc9c'
    }
  });
export default SelecaoInteresseScreen;