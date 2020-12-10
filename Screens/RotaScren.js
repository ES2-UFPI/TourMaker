import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class RotaScreen extends Component{
    render(){
        console.log(this.props.route.params)
        return(
            <View style={styles.RotaScreen}>
                <Text>Tela da rota</Text>
                <Text>Exibir a rota para o usuario</Text>
                <Text>Os dados devem ser recebidos via Async-Storage (Para 2º sprint)</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RotaScreen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  });
export default RotaScreen;