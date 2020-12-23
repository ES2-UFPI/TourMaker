import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import CustomButton from './ScreensModules/CustomButton';

class ControleRoteiroScreen extends Component{
    constructor(props){
        super(props)
        var table = []
        if (props.route.params.listaPDI != null){
            props.route.params.listaPDI.forEach(element => {
                table.push([element.placeName,element.rating," "])
            });
        }
        this.state ={
            listaPDI: props.route.params.listaPDI,
            tableHead: ["Parada", "Avaliação", 'Excluir'],//avaliação Maps
            tableData: table
        }
    }

    deleteStop(index) { 
        var a = this.state.listaPDI.filter( (item, b) => {
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
        // Refazer/Reorganizar Roteiro
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
            <View style={styles.RotaScreen}>
                <Text>Gereciamento de Roteiro</Text>
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
                    title="Adicionar Parada"
                    color={styles.Buttons.color}
                    onPress={()=>{
                        const paramsRota = {
                            listaPDI: this.state.listaPDI
                        }
                        this.props.navigation.push('RoteiroManual', paramsRota)
                    }}
                />
                
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
export default ControleRoteiroScreen;

