import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import CustomButton from './ScreensModules/CustomButton';
import CustomTable from './ScreensModules/CustomTable';
import CustomMapView from './ScreensModules/CustomMapView';
import TableButton from './ScreensModules/TableButton';

import ReactMaps from '../APIs/ReactMaps';

import Styles from './Styles';

/*
    Usar função abaixo para acessar parametro passados de tela para tela:
        this.props.route.params
    
    Usar para passar props de uma tela a outra, coloque nos objetos:
        paramsRoteiroAutomatico
        paramsRoteiroManual
*/

class RoteiroAutomaticoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoPDI: " ",
            PDI: " ",
            listaPDI: [],
            tiposPDI: ["Alimentação", "Compras", "Hospedagem", "Parque de Diversões", "Galeria de Arte", "Biblioteca", "Atração Turistica", "Zoologico", "Museu", "Cinema", "Spa", "Estádio", "Parque"],
            tableHead: ["Tipo", "Quantidade", "Excluir"],//atualizar com os dados dos tipos escolhidos
            tableData: [],
            userLocation: null,
            listaTipos: [],
            flags: []
        };
    }

    searchPDI(item, index) {

        var a
        switch (item.tipoPDI) {
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
        //console.log(1,a)
        ReactMaps.getLocationByType(a, (result) => {
            //console.log(2,a)
            var listaPDI = this.state.listaPDI
            //console.log(3,listaPDI.length)
            if (listaPDI.length == 0) {
                var b = result.filter((element, index) => { return index < item.quant })
                b.forEach(element => {
                    listaPDI.push(element)
                });
            }
            else {
                var i
                for (i = 0; i < item.quant; i++) {
                    var menorDistancia = this.calculoLocalizacao(listaPDI[listaPDI.length - 1].coordinate, result[0].coordinate)
                    var menorIndex = 0
                    result.forEach((element, index) => {
                        var a = this.calculoLocalizacao(listaPDI[listaPDI.length - 1].coordinate, element.coordinate)
                        if (menorDistancia > a) {
                            menorDistancia = a
                            menorIndex = index
                        }
                    });
                    listaPDI.push(result[menorIndex])
                    result = result.filter((element, index) => {
                        return index != menorIndex
                    })
                }
            }
            var flags = this.state.flags
            flags[index] = true
            this.setState({ listaPDI: listaPDI, flags: flags });
        })

    }

    criarRoteiro(index) {
        if (this.state.listaTipos.length != 0 && this.state.listaTipos.length > index) {
            this.searchPDI(this.state.listaTipos[index], index)
            var flags = this.state.flags
            flags.push(false)
            this.setState({ flags: flags })
            this.criarRoteiro(index + 1)
        }
    }

    deleteStop(index) {
        var a = this.state.listaTipos.filter((item, b) => {
            return b !== index
        })
        this.setState({
            listaTipos: a
        })
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
        if (this.state.listaTipos != null) {
            this.state.listaTipos.forEach((element, index) => {
                tableData.push([
                    element.tipoPDI,
                    element.quant,
                    TableButton(index, this.deleteStop.bind(this), 'Excluir')
                ])
            });
        }
        var podeSeguir = true
        for (var i = 0; i < this.state.flags.length; i++) {
            podeSeguir = podeSeguir && this.state.flags[i]
        }
        if (podeSeguir && this.state.flags.length != 0) {
            console.log("\n\n ~~~~ok~~~~\n\n")
            const paramsRota = {
                listaPDI: this.state.listaPDI,
                userLocation: this.state.userLocation
            }
            this.setState({ flags: [] })
            this.props.navigation.push('GerenciamentoRoteiro', paramsRota)
        }

        return (
            <View style={Styles.Screen}>

                <Text>Criar Novo Roteiro Automático</Text>
                <Text>Descubra a melhor rota para os seus interesses</Text>
                <Picker
                    selectedValue={this.state.tipoPDI}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue) => {
                        var listaTipos = this.state.listaTipos
                        listaTipos.push({ tipoPDI: itemValue, quant: 1 })
                        this.setState({ listaTipos })
                    }
                    }>
                    <Picker.Item label="Tipo" />
                    {this.state.tiposPDI.map((item) => {
                        return (<Picker.Item value={item} label={item} key={item} />)
                    })}
                </Picker>

                <CustomMapView
                    style={{ height: 200 }}
                    markers={this.state.listaPDI}
                    UserLocation={(location) => {
                        this.setState({
                            userLocation: location
                        })
                    }}
                />

                <View style={Styles.Container}>
                    <CustomTable
                        tableHead={this.state.tableHead}
                        tableData={tableData}
                    />
                </View>

                <CustomButton
                    title="Criar Roteiro Automático"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
                        this.setState({
                            listaPDI: [],
                            flags: []
                        })
                        this.criarRoteiro(0)
                    }}
                />
            </View>
        )
    }
}

export default RoteiroAutomaticoScreen;