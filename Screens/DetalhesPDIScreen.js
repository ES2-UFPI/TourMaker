import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import CustomButton from './ScreensModules/CustomButton';
import FirebaseFunctions from'../APIs/Firebase.js'
import CustomMapView from "./ScreensModules/CustomMapView";
import ReactMaps from '../APIs/ReactMaps'


class DetalhesPDIScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            nome : props.route.params.PDI.placeName,
            address : props.route.params.PDI.formatted_address,
            isOpen : props.route.params.PDI.opening_hours,
            //isOpen : props.route.params.PDI.opening_hours.open_now === true ? "Aberto" : "Fechado",
            comments : []
        }
        //try {
        //    this.setState({
        //        comments : FirebaseFunctions.returnComments(props.route.params.PDI.placeID)
        //    })
            //console.log(this.state.comments)
        //} catch (error) {
        //    console.log(error)
        //}
        //console.log(this.state.nome)
    }
    render(){
        return(
        <View>
            <Text>Isso é um Teste</Text>
        </View>
        )
        
    }
        
}


const styles = StyleSheet.create({
    DetalhesPDIScreen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    Buttons:{
        color: '#1abc9c'
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40,width: 400, backgroundColor: '#1abc9c' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#f1f8ff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' } 
  });
export default DetalhesPDIScreen;