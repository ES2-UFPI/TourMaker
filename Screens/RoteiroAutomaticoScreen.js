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

function distância (resultListaTipos, result, quant) {
    var b = result.filter((_, index) => { return index < quant })
        b.forEach(element => {
            resultListaTipos.push(element)
        });
    return resultListaTipos;
}

function avaliação (resultListaTipos, result, quant) {
    result = result.sort((a,b) => {
        return b.rating - a.rating;
    })
    var b = result.filter((_, index) => { return index < quant })
        b.forEach(element => {
            resultListaTipos.push(element)
        });
    return resultListaTipos;
}

class RoteiroAutomaticoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tipoPDI: " ",
            PDI: " ",
            tiposPDI: ["Alimentação", "Compras", "Hospedagem", "Parque de Diversões", "Galeria de Arte", "Biblioteca", "Atração Turistica", "Zoologico", "Museu", "Cinema", "Spa", "Estádio", "Parque"],
            tableHead: ["Tipo", "Quantidade", "Excluir"],//atualizar com os dados dos tipos escolhidos
            userLocation: null,
            listaTipos: [],
            flags: [],
            resultListaTipos: [],
            modo: {
                label: "Distância",
                value: distância,
            }
        };
    }

    searchPDI(item, indexResult) {

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
        ReactMaps.getLocationByType(a, (result) => {
            var resultListaTipos = this.state.resultListaTipos[indexResult]
            resultListaTipos = this.state.modo.value(resultListaTipos, result,item.quant)
            var flags = this.state.flags
            flags[indexResult] = true
            var PDIs = this.state.resultListaTipos
            PDIs[indexResult] = resultListaTipos
            this.setState({ resultListaTipos: PDIs, flags: flags });
        })

    }

    criarRoteiro(index) {
        if (this.state.listaTipos.length != 0 && this.state.listaTipos.length > index) {
            this.searchPDI(this.state.listaTipos[index], index)
            var flags = this.state.flags
            var resultListaTipos = this.state.resultListaTipos
            flags.push(false)
            resultListaTipos.push([])
            this.setState({ flags, resultListaTipos })
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

    componentDidUpdate() {
        var podeSeguir = true
        for (var i = 0; i < this.state.flags.length; i++) {
            podeSeguir = podeSeguir && this.state.flags[i]
        }
        if (podeSeguir && this.state.flags.length != 0) {
            var List = []
            for (var i in this.state.resultListaTipos) {
                if (this.state.resultListaTipos[i].length == 0) {
                    alert("Não existem PDIs proximas a você do tipo " + this.state.listaTipos[i].tipoPDI)
                }
                List = List.concat(this.state.resultListaTipos[i])
            }
            const paramsRota = {
                listaPDI: List,
                userLocation: this.state.userLocation
            }
            this.setState({ flags: [], resultListaTipos: [] })
            this.props.navigation.push('GerenciamentoRoteiro', paramsRota)
        }
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

                <Picker
                    selectedValue={this.state.modo.label}
                    style={{ height: 50, width: 200, justifyContent: "center", alignItems: "center"}}
                    onValueChange={(itemValue) => {
                        var modo;
                        switch (itemValue) {
                            case "distância":
                                modo = {
                                    label: "distância",
                                    value: distância,
                                }
                                break;
                            case "avaliação":
                                modo = {
                                    label: "avaliação",
                                    value: avaliação,
                                }
                                break;
                        }
                        this.setState({ modo })
                    }
                    }>
                    <Picker.Item label="Distância" value="distância"/>
                    <Picker.Item label="Avaliação" value="avaliação"/>
                </Picker>

                <CustomButton
                    title="Criar Roteiro Automático"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
                        this.setState({
                            resultListaTipos: [],
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