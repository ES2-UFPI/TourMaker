import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import CustomButton from './ScreensModules/CustomButton';
import CustomTable from './ScreensModules/CustomTable';
import CustomMapView from './ScreensModules/CustomMapView';
import TableButton from './ScreensModules/TableButton';

import ReactMaps from '../APIs/ReactMaps'

import Styles from './Styles';

class RoteiroManualScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoPDI: " ",
            PDI: " ",
            listaPDI: props.route.params.listaPDI === undefined ? [] : props.route.params.listaPDI,
            tiposPDI: ["Alimentação", "Compras", "Hospedagem", "Parque de Diversões", "Galeria de Arte", "Biblioteca", "Atração Turistica", "Zoologico", "Museu", "Cinema", "Spa", "Estádio", "Parque"],
            listaPDIselecao: [],
            tableHead: ["Parada", "Avaliação", 'Excluir', 'Detalhes'],//atualizar campos com dados dos PDIs mineredos
            userLocation: null
        };
    }
    deleteStop(index) {
        var a = this.state.listaPDI.filter((item, b) => {
            return b !== index
        })
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

    searchPDI(tipoPDI) {

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
        ReactMaps.getLocationByType(a, (result) => {
            this.setState({ listaPDIselecao: result });
        })

    }

    controlRepet(data) {
        var a = this.state.listaPDIselecao.filter(item => {
            return item !== data
        })
        this.setState({
            listaPDIselecao: a
        })
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
                {this.props.route.params.flagEdition ? (<Text>Editando Roteiro</Text>) : (<Text>Criar Novo Roteiro</Text>)}
                <Text>Escolha pra Onde quer ir e Tenha a Melhor Rota</Text>
                <Picker
                    selectedValue={this.state.tipoPDI}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue) => {
                        this.setState({ tipoPDI: itemValue })
                        this.searchPDI(itemValue)
                    }
                    }>
                    <Picker.Item label="Tipo" />
                    {this.state.tiposPDI.map((item) => {
                        return (<Picker.Item value={item} label={item} key={item} />)
                    })}
                </Picker>

                <Picker
                    selectedValue={"Opções"}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue) => {
                        var a = itemValue
                        this.state.listaPDI.push(a)
                        this.controlRepet(a)
                    }
                    }>
                    <Picker.Item label="Selecione Locais" />
                    {this.state.listaPDIselecao.map((item) => {
                        return (<Picker.Item value={item} label={item.placeName} key={item.placeId} />)
                    })}
                </Picker>
                <CustomMapView
                    style={{height: 200}}
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
                    title="Criar Roteiro"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
                        const paramsRota = {
                            listaPDI: this.state.listaPDI,
                            userLocation: this.state.userLocation
                        }
                        var routeLength = this.props.navigation.dangerouslyGetState().routes.length
                        var previousScreen = this.props.navigation.dangerouslyGetState().routes[routeLength - 2].name
                        if (previousScreen == 'Home') {
                            this.props.navigation.push('GerenciamentoRoteiro', paramsRota)
                        } else {
                            this.props.navigation.pop()
                        }
                    }}
                />
            </View>
        )
    }


}

export default RoteiroManualScreen;