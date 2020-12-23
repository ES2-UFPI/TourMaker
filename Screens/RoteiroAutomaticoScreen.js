import React, { Component } from 'react';
import { StyleSheet, View, Text, Input, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';

import CustomButton from './ScreensModules/CustomButton';
import CustomMapView from "./ScreensModules/CustomMapView";
import ReactMaps from '../APIs/ReactMaps';

/*
    Usar função abaixo para acessar parametro passados de tela para tela:
        this.props.route.params
    
    Usar para passar props de uma tela a outra, coloque nos objetos:
        paramsRoteiroAutomatico
        paramsRoteiroManual
*/

class RoteiroAutomaticoScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tipoPDI: " ",
            PDI:" ",
            listaPDI:[],
            tiposPDI: ["Alimentação","Compras", "Hospedagem", "Parque de Diversões","Galeria de Arte","Biblioteca","Atração Turistica","Zoologico","Museu","Cinema","Spa", "Estádio", "Parque"],
            tableHead: ["Parada", 'Excluir'],//atualizar com os dados dos PDIs mineredos
            tableData: [],
            userLocation: null

        };
    }

    searchPDI(tipoPDI){

        var a
        switch (tipoPDI) {
            case "Alimentação":
                a = "restaurant" //trocar para food se possivel
                break;

            case "Compras":
                a = "store"
                break;

            case "Hospedagem":
                a = "lodging"
                break;

            case "Parque de Diversões":
                a = "amusement_park"
                break;
            
            case "Galeria de Arte":
                a = "art_gallery"
                break;

            case "Biblioteca":
                a = "library"
                break;
            
            case "Atração Turistica":
                a = "tourist_attraction"
                break;
            case "Zoologico":
                a = "zoo"
                break;
            case "Museu":
                a = "museum"
                break;
            case "Cinema":
                a = "movie_theater"
                break;
            case "Spa":
                a = "spa"
                break;
            case "Estádio":
                a = "stadium"
                break;
            case "Parque":
                a = "park"
                break;
        }
        ReactMaps.getLocationByType(a,(result)=> {
            var listaPDI = this.state.listaPDI
            var b =  result.filter((element,index) => {return index < 5})
            b.forEach(element => {
                listaPDI.push(element)
            });
            this.setState({listaPDI: listaPDI});
        })
        
    }


    deleteStop(index) { 
        var itemReadd
        var a = this.state.listaPDI.filter( (item, b) => {
            if(b === index){
                itemReadd = item
            }
            return b !== index
        })
        this.setState({
            listaPDI: a
        })

        a = this.state.tableData.filter((item, b) => {
            return b !== index
        })
        this.setState({
            tableData: a
        })
    }

    render(){

        var tableData = []
        if (this.state.listaPDI != null){
            this.state.listaPDI.forEach(element => {
                tableData.push([element.placeName,element.rating," "])
            });
        }
        
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this.deleteStop(index)}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Excluir</Text>
              </View>
            </TouchableOpacity>
          );

        return(
            <View style={styles.RoteiroAutomaticoScreen}>
                
                <Text>Criar Novo Roteiro Automático</Text>
                <Text>Descubra a melhor rota para os seus interesses</Text>
                <Picker
                    selectedValue={this.state.tipoPDI}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) =>
                        {this.setState({ tipoPDI: itemValue }),
                        this.searchPDI( itemValue ) }
                    }>
                    <Picker.Item label= "Tipo"/>
                    {this.state.tiposPDI.map((item, index) => {
                        return (<Picker.Item value = {item} label={item} key = {item}/>)
                    })}
                </Picker>

                <CustomMapView 
                style = {{height: 200}} 
                markers={this.state.listaPDI}
                useUserLocation={(location)=>{
                    this.setState({
                        userLocation: location
                    })
                }}
                />

                <View style={styles.container}>
                    <Table borderStyle={{ borderColor: 'transparent' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                        {
                            tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                    
                </View>
                
                <CustomButton
                    title="Criar Roteiro Automático"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        const paramsRota = {
                            listaPDI: this.state.listaPDI,
                            userLocation: this.state.userLocation
                        }
                        this.props.navigation.push('GerenciamentoRoteiro', paramsRota)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RoteiroAutomaticoScreen: {
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
export default RoteiroAutomaticoScreen;