import React, { Component } from 'react';
import { StyleSheet, View, Text, Input, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import CustomButton from './ScreensModules/CustomButton';

import CustomMapView from "./ScreensModules/CustomMapView";
import ReactMaps from '../APIs/ReactMaps'


class RoteiroManualScreen extends Component{
    constructor(props) {
        super(props);
        var table = []
        if (props.route.params.listaPDI != undefined){
            props.route.params.listaPDI.forEach(element => {
                table.push([element.placeName,element.rating," "])
            });
        }
        this.state = {
            tipoPDI: " ",
            PDI:" ",
            listaPDI:props.route.params.listaPDI === undefined ? []:props.route.params.listaPDI,
            tiposPDI: ["Alimentação","Compras", "Hospedagem", "Parque de Diversões","Galeria de Arte","Biblioteca","Atração Turistica","Zoologico","Museu","Cinema","Spa", "Estádio", "Parque"],
            listaPDIselecao:[],
            tableHead: ["Parada", "Funcionamento", 'Excluir'],//atualizar campos com dados dos PDIs mineredos
            tableData: table,
            userLocation: null

        };    
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
        a = this.state.listaPDIselecao
        a.push(itemReadd)
        this.setState({
            listaPDIselecao: a
        })

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
            this.setState({listaPDIselecao: result});
        })
        
    }

    tableHandle(data){
        var tableData = this.state.tableData
        //var open = data.opening_hours.open_now ? "Aberto":"Fechado"
        tableData.push([data.placeName,"placeholder"," "])//atualizar campos com dados dos PDIs minerados
        this.setState({
            tableData: tableData
        })
    }

    controlRepet(data){
        var a = this.state.listaPDIselecao.filter( item => {
            return item !== data
        })
        this.setState({
            listaPDIselecao: a
        })
    }
    
    render(){
        
        

        const element = (data, index) => (
            <TouchableOpacity onPress={() => this.deleteStop(index)}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Excluir</Text>
              </View>
            </TouchableOpacity>
          );
        
        return(

            <View style={styles.RoteiroManualScreen}>
                
                <Text>Criar Novo Roteiro</Text>
                <Text>Escolha pra Onde quer ir e Tenha a Melhor Rota</Text>
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

                <Picker
                    selectedValue={"Opções"}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue) =>{
                        var a = itemValue
                        this.state.listaPDI.push(a)
                        this.tableHandle(a)
                        this.controlRepet(a)
                     }
                    }>
                    <Picker.Item label= "Selecione Locais"/>
                    {this.state.listaPDIselecao.map((item) => {
                        return (<Picker.Item value = {item} label={item.placeName} key = {item.placeId}/>)
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
                            this.state.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                    
                </View>
                
                <CustomButton
                    title="Criar Roteiro"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        const paramsRota = {
                            listaPDI: this.state.listaPDI,
                            userLocation: this.state.userLocation
                        }
                        this.props.navigation.navigate('GerenciamentoRoteiro', paramsRota)
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
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40,width: 400, backgroundColor: '#1abc9c' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#f1f8ff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' } 
  });
export default RoteiroManualScreen;