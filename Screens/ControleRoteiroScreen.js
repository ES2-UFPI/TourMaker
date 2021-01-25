import React, { Component } from 'react';
import { View, Text } from 'react-native';


import CustomTable from './ScreensModules/CustomTable';
import CustomButton from './ScreensModules/CustomButton';
import TableButton from './ScreensModules/TableButton';

import Styles from './Styles';

function HookComponents({ navigation, route, setState, criaçãoRoteiro }) {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            criaçãoRoteiro()
            setState(route.params.listaPDI)
        });

        return unsubscribe;
    }, [navigation]);

    return null;
}

class ControleRoteiroScreen extends Component {
    constructor(props) {
        super(props)
        var listaOrdenada = this.criaçãoRoteiro(props.route.params.listaPDI, props.route.params.userLocation)
        this.state = {
            listaPDI: listaOrdenada,
            tableHead: ["Parada", "Avaliação", 'Excluir', 'Detalhes'],//avaliação Maps
            userlocation: props.route.params.userLocation
        }

    }

    deleteStop(index) {
        var a = this.state.listaPDI.filter((item, b) => {
            return b !== index
        })
        a = this.criaçãoRoteiro(a, this.state.userlocation)
        this.setState({
            listaPDI: a
        })

    }
    details(index) {
        const paramsDetalhes = {
            PDI: this.state.listaPDI[index]
        }
        this.props.navigation.push('DetalhesPDI', paramsDetalhes)
    }
    criaçãoRoteiro(listaOriginal, userlocation) {
        var resultRoteiro = []
        var pontoAtual = { coordinate: userlocation }
        while (listaOriginal.length > 0) {
            var menorDistancia = this.calculoLocalizacao(pontoAtual.coordinate, listaOriginal[0].coordinate)
            var menorIndex = 0
            listaOriginal.forEach((element, index) => {
                var a = this.calculoLocalizacao(pontoAtual.coordinate, element.coordinate)
                if (menorDistancia > a) {
                    menorDistancia = a
                    menorIndex = index
                }
            });
            resultRoteiro.push(listaOriginal[menorIndex])
            pontoAtual = listaOriginal[menorIndex]
            listaOriginal = listaOriginal.filter((element, index) => {
                return index != menorIndex
            })
        }
        return resultRoteiro
    }

    calculoLocalizacao(ponto1, ponto2) {
        var DLA = ponto1.latitude - ponto2.latitude
        DLA = DLA >= 0 ? DLA : -DLA
        DLA = {
            grau: parseInt(DLA),
            minuto: parseInt((DLA - parseInt(DLA)) * 60),
            segundo: (((DLA - parseInt(DLA)) * 60) - parseInt((DLA - parseInt(DLA)) * 60)) * 60
        }
        DLA = (DLA.grau * 60 + DLA.minuto + DLA.segundo / 60) * 1.852


        var DLO = ponto1.longitude - ponto2.longitude
        DLO = DLO >= 0 ? DLO : -DLO
        DLO = {
            grau: parseInt(DLO),
            minuto: parseInt((DLO - parseInt(DLO)) * 60),
            segundo: (((DLO - parseInt(DLO)) * 60) - parseInt((DLO - parseInt(DLO)) * 60)) * 60
        }
        DLO = (DLO.grau * 60 + DLO.minuto + DLO.segundo / 60) * 1.852
        return (Math.sqrt(DLA * DLA + DLO * DLO))
    }

    render() {
        
        var tableData = []
        if (this.state.listaPDI != null) {
            this.state.listaPDI.forEach((element, index) => {
                tableData.push([
                    element.placeName,
                    element.rating,
                    TableButton(index, this.deleteStop.bind(this), 'Excluir'),
                    TableButton(index, this.details.bind(this), 'Detalhes')
                ])
            });
        }
        return (
            <View style={Styles.Screen}>
                <Text>Gereciamento de Roteiro</Text>
                <View style={Styles.Container}>
                    <CustomTable
                        tableHead={this.state.tableHead}
                        tableData={tableData}
                    />
                </View>
                <CustomButton
                    title="Adicionar Parada"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
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
                    setState={(state) => {
                        this.setState({ flag: 1 })
                    }}
                    criaçãoRoteiro={() => {
                        this.criaçãoRoteiro(this.state.listaPDI, this.state.userlocation)
                    }}
                />
            </View>
        )
    }
}

export default ControleRoteiroScreen;

