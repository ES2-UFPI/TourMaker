import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
            tiposPDI: ["Alimentação","Compras", "Hospedagem", "Entretenimento", "Outros"], //Separar a categoria dos PDIs minerados, a ser feito
            listaPDIselecao:[],
            tableHead: ["Parada", 'Excluir'],//atualizar com os dados dos PDIs mineredos
            tableData: []

        };
    }

    searchPDI(tipoPDI){
        // a fazer: procurar dentro do mapa as pdis proximos do tipo escolhido e mostrar no mapa
        var placeholderListaPDI = ["lugar mágico","lugar legal","etc"];
        this.state.listaPDIselecao= placeholderListaPDI;
    }

    tableHandle(data){
        var tableData = this.state.tableData
        tableData.push([data," "])//atualizar campos com dados dos PDIs mineredos
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

        console.log(this.props.route.params)
        const paramsRota = {
            listaPDI: this.state.listaPDI
        }
        
        return(
            <View style={styles.RoteiroAutomaticoScreen}>
                
                <Text>Criar Novo Roteiro Automático</Text>
                <Text>Descubra a melhor rota para os seus interesses</Text>
                <Picker
                    selectedValue={this.state.tipoPDI}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, itemIndex) =>
                        {this.setState({ tipoPDI: itemValue }),
                        this.searchPDI( this.state.tipoPDI ) }
                    }>
                    <Picker.Item label= "Tipo"/>
                    {this.state.tiposPDI.map((item, index) => {
                        return (<Picker.Item value = {item} label={item} key = {item}/>)
                    })}
                </Picker>

                <CustomMapView style = {{height: 200}}/>

                <View style={styles.container}>
                    <Table borderStyle={{ borderColor: 'transparent' }}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                        {
                            this.state.tableData.map((rowData, index) => (
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
                        this.props.navigation.navigate('Rota', paramsRota)
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