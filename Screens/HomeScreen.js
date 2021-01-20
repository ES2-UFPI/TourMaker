import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomMapView from './ScreensModules/CustomMapView';
import CustomButton from './ScreensModules/CustomButton';

/*
    Usar para passar props de uma tela a outra, coloque nos objetos:
        paramsRoteiroAutomatico
        paramsRoteiroManual
*/

class HomeScreen extends Component{
    state = {
        listaPDI:[],
        UserLocation: null
    }

    render(){

        const paramsRoteiroAutomatico = {
            exemp: 'Para mandar para a tela Roteiro Automatico'
        }
        const paramsRoteiroManual = {
            exemp: 'Para mandar para a tela Roteiro Manual'
        }

        return(
            <View style={styles.Home}>
                <CustomMapView
                    EnableNearbySeach={true}
                />
                <CustomButton
                    title="Criar Roteiro Automatico"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        this.props.navigation.push('RoteiroAutomatico', paramsRoteiroAutomatico)
                    }}
                />
                <CustomButton
                    title="Criar Roteiro Manual"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        this.props.navigation.push('RoteiroManual', paramsRoteiroManual)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Home: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    Buttons:{
        color: '#1abc9c'
    }
  });
export default HomeScreen;