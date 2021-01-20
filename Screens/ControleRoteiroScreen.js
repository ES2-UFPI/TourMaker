import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import CustomButton from './ScreensModules/CustomButton';

function HookComponents({ navigation, route, setState, criaçãoRoteiro}) {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        criaçãoRoteiro()
        setState(route.params.listaPDI)
      });
  
      return unsubscribe;
    }, [navigation]);
  
    return null;
  }

class ControleRoteiroScreen extends Component{
    constructor(props){
        super(props)
        var listaOrdenada = this.criaçãoRoteiro(props.route.params.listaPDI, props.route.params.userLocation)
        this.state ={
            listaPDI: listaOrdenada,
            tableHead: ["Parada", "Avaliação", 'Excluir', 'Detalhes'],//avaliação Maps
            userlocation: props.route.params.userLocation
        }
        
    }

    deleteStop(index) { 
        var a = this.state.listaPDI.filter( (item, b) => {
            return b !== index
        })
        a = this.criaçãoRoteiro(a,this.state.userlocation)
        this.setState({
            listaPDI: a
        })
        
    }
    details(index){
        const paramsDetalhes = {
            PDI: this.state.listaPDI[index]
        }
        this.props.navigation.push('DetalhesPDI', paramsDetalhes)
    }
    criaçãoRoteiro(listaOriginal,userlocation){
        var resultRoteiro = []
        var pontoAtual = {coordinate: userlocation}
        while (listaOriginal.length > 0){
            var menorDistancia = this.calculoLocalizacao(pontoAtual.coordinate,listaOriginal[0].coordinate)
            var menorIndex = 0
            listaOriginal.forEach((element,index) => {
                var a =this.calculoLocalizacao(pontoAtual.coordinate,element.coordinate)
                if (menorDistancia > a){
                    menorDistancia = a
                    menorIndex = index
                }
            });
            resultRoteiro.push(listaOriginal[menorIndex])
            pontoAtual = listaOriginal[menorIndex]
            listaOriginal =  listaOriginal.filter((element,index) =>{
                return index != menorIndex
            })
        }
        return resultRoteiro
    }

    calculoLocalizacao(ponto1, ponto2){
        var DLA = ponto1.latitude - ponto2.latitude
        DLA = DLA >= 0 ? DLA : -DLA
        DLA = {
            grau: parseInt(DLA),
            minuto: parseInt((DLA - parseInt(DLA))*60),
            segundo:(((DLA - parseInt(DLA))*60)-parseInt((DLA - parseInt(DLA))*60))*60
        }
        DLA = (DLA.grau *60 + DLA.minuto + DLA.segundo/60)*1.852
        

        var DLO = ponto1.longitude - ponto2.longitude
        DLO = DLO >= 0 ? DLO : -DLO
        DLO = {
            grau: parseInt(DLO),
            minuto: parseInt((DLO - parseInt(DLO))*60),
            segundo:(((DLO - parseInt(DLO))*60)-parseInt((DLO - parseInt(DLO))*60))*60
        }
        DLO = (DLO.grau *60 + DLO.minuto + DLO.segundo/60)*1.852
        return(Math.sqrt(DLA*DLA + DLO*DLO))
    }


    render(){
        var tableData = []
        if (this.state.listaPDI != null){
            this.state.listaPDI.forEach(element => {
                tableData.push([element.placeName,element.rating," ", " "])
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
          const verDetalhes = (data, index) => (
            <TouchableOpacity onPress={() => this.details(index) }>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Detalhes</Text>
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
                                            <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellIndex === 3 ? verDetalhes(cellData, index) : cellData} textStyle={styles.text} />
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
                    criaçãoRoteiro = {( ) => {
                        this.criaçãoRoteiro(this.state.listaPDI, this.state.userlocation)
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

