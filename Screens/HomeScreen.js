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
    render(){
        const paramsRoteiroAutomatico = {
            exemp: 'Para mandar para a tela Roteiro Automatico'
        }
        const paramsRoteiroManual = {
            exemp: 'Para mandar para a tela Roteiro Manual'
        }

        return(
            <View style={styles.Home}>
                <CustomMapView/>
                <CustomButton
                    title="Criar Roteiro Automatico"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        this.props.navigation.navigate('RoteiroAutomatico', paramsRoteiroAutomatico)
                    }}
                />
                <CustomButton
                    title="Criar Roteiro Manual"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        this.props.navigation.navigate('RoteiroManual', paramsRoteiroManual)
                    }}
                />
                <CustomButton
                    title="Pontos de interesse proximos"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        this.props.navigation.navigate('SelecaoPDI', paramsRoteiroManual)
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