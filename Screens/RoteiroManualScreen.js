import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomButton from './ScreensModules/CustomButton';

import ReactMaps from '../APIs/ReactMaps'

/*
    Usar função abaixo para acessar parametro passados de tela para tela:
        this.props.route.params
        
    Usar para passar props de uma tela a outra, coloque nos objetos:
        paramsRoteiroAutomatico
        paramsRoteiroManual
*/

class RoteiroManualScreen extends Component{
    render(){
        console.log(this.props.route.params)
        const paramsRota = {
            exemp: 'Para mandar para a tela Rota'
        }
        return(
            <View style={styles.RoteiroManualScreen}>
                <Text>Tela do Roteiro Manual</Text>
                <Text>Barra de Pesquisa (A implementar)</Text>
                
                <CustomButton
                    title="Confirmar Roteiro Manual"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        this.props.navigation.navigate('Rota', paramsRota)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RoteiroManualScreen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    Buttons:{
        color: '#1abc9c'
    }
  });
export default RoteiroManualScreen;