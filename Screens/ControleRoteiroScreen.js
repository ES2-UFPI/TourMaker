import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import CustomButton from './ScreensModules/CustomButton';

function HookComponents({ navigation, route, setState}) {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setState(route.params.listaPDI)
      });
  
      return unsubscribe;
    }, [navigation]);
  
    return null;
  }

class ControleRoteiroScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            listaPDI: props.route.params.listaPDI,
            tableHead: ["Parada", "Avaliação", 'Excluir'],//avaliação Maps
        }
    }

    deleteStop(index) { 
        var a = this.state.listaPDI.filter( (item, b) => {
            return b !== index
        })
        this.setState({
            listaPDI: a
        })
        // Refazer/Reorganizar Roteiro
    }

    render(){
        var tableData = []
        if (this.state.listaPDI != null){
            this.state.listaPDI.forEach(element => {
                tableData.push([element.placeName,element.rating," "])
            });
        }
        // console.log("Aqui a tabela", tableData)

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
                            tableData.map((rowData, index) => (
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
                            listaPDI: this.state.listaPDI,
                            flagEdition: true
                        }
                        this.props.navigation.push('RoteiroManual', paramsRota)
                    }}
                />
                <HookComponents
                    navigation={this.props.navigation}
                    route={this.props.route}
                    setState={(state)=>{
                        this.setState({flag: 1})
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

