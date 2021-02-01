import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import CustomTable from './ScreensModules/CustomTable';
import TableButton from './ScreensModules/TableButton';
import Styles from './Styles';
import CustomMapView from './ScreensModules/CustomMapView';


import AsyncStorageFunctions from '../APIs/AsyncStorage';
class SavedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaRoteiros: this.recoverFav(),
            tableHead: ["Titulo","Opções"],
            userLocation: null
        }
    }

    recoverFav(){
        AsyncStorageFunctions.retrieveData("favoritos",(result)=>{
            this.setState({
                listaRoteiros: result
            })
            })
    }

    deleteFav(index1){
        var newListaRoteiros= []
        this.state.listaRoteiros.forEach((element,index) => {
            if (index1 != index){
                newListaRoteiros.push(element)
            }   
        });
        this.setState({
            listaRoteiros: newListaRoteiros
        })
        AsyncStorageFunctions.storeData(newListaRoteiros, "favoritos")
    }
    
    useFav(index){
        const paramsRota = {
            listaPDI: this.state.listaRoteiros[index].rota,
            userLocation: this.state.userLocation
        }
        var routeLength = this.props.navigation.dangerouslyGetState().routes.length
        var previousScreen = this.props.navigation.dangerouslyGetState().routes[routeLength - 2].name
        if (previousScreen == 'Home') {
            this.props.navigation.push('GerenciamentoRoteiro', paramsRota)
        } else {
            this.props.navigation.pop()
        }
    }


    render() {  
        var tableData = []
        if (this.state.listaRoteiros!= null){
            this.state.listaRoteiros.forEach((element, index) => {
                
                tableData.push([
                    element.titulo,
                    TableButton(index, this.deleteFav.bind(this), 'Excluir'),
                    TableButton(index, this.useFav.bind(this), 'Gerenciar')
                ])
            });
        } 
        return(
            <View style={Styles.Screen}>
            <Text>Gereciamento de Roteiro</Text>
                <View style={Styles.Container}>
                    <CustomTable
                        tableHead={this.state.tableHead}
                        tableData={tableData}
                    />
                <CustomMapView
                style={{height: 0}}
                markers={this.state.listaPDI}
                UserLocation={(location) => {
                    this.setState({
                        userLocation: location
                    })
                }}
            />
                </View>
                
            </View>
        )
    }
}

export default SavedScreen;