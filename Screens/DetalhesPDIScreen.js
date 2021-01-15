import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import CustomButton from './ScreensModules/CustomButton';
import FirebaseFunctions from'../APIs/Firebase.js'
import CustomMapView from "./ScreensModules/CustomMapView";
import ReactMaps from '../APIs/ReactMaps'


class DetalhesPDIScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            nome : props.route.params.PDI.placeName,
            address : props.route.params.PDI.formatted_address.split(","),
            isOpen : props.route.params.PDI.opening_hours,
            gallery : null,
            //isOpen : props.route.params.PDI.opening_hours.open_now === true ? "Aberto" : "Fechado",
            comments : [],
            tableHead: ["Comentários", "Avaliação"],
        }
        /*
        try {
            FirebaseFunctions.returnComments(props.route.params.PDI.placeID, (result) => {
                this.setState({
                    comments : result
                })
            })
            console.log(this.state.comments)
        } catch (error) {
            console.log(error)
        }
        */
        ReactMaps.getPhotoByReference(props.route.params.PDI.gallery, (result) => {
            this.setState({
                gallery : {
                    uri: result
                }
            })
        })
    }



    render(){
        var conteudo = "Este local "
        if (this.state.isOpen != undefined){
            conteudo += "está " + (this.state.isOpen.open_now ? "Aberto" : "Fechado")
        }
        else{
            conteudo += "não fornece dados de horário de funcionamento"
        }
                    
        return(
        <View style={styles.DetalhesPDIScreen}>
            <Image source={this.state.gallery} style={styles.img}/>
            <View style={styles.viewText}>            
                <Text>{this.state.nome}</Text>
                <View style={styles.viewAddress}>
                {
                    
                    this.state.address.map((data, index) => (
                        <Text key={index}>{data}</Text>

                    ))
                }
                </View>
                <View style={styles.viewAddress}>
                {
                    conteudo.split(' ').map((data, index) => (
                        <Text key={index}>{data} </Text>

                    ))
                }
                </View>
            </View>
            
            <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                    {
                        this.state.comments.map((rowData, index) =>(
                            <TableWrapper key={index} style={styles.row}> 
                                {
                                    rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellData} textStyle={styles.text}></Cell>
                                    ))

                                }
                            
                            </TableWrapper>


                        ))
                    }
            </Table>
            
        </View>
        )
        
    }
        
}


const styles = StyleSheet.create({
    DetalhesPDIScreen: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    head: { height: 40,width: 400, backgroundColor: '#1abc9c' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#f1f8ff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' } ,
    img: {width:200, height:200},
    viewText:{padding: 10, alignItems:'center', backgroundColor:'#c5fcf1',alignSelf:'stretch', margin:5, borderRadius:50, borderWidth:1, borderColor:'#1abc9c'},
    viewAddress:{alignSelf:'stretch', flexDirection:'row', flexWrap:'wrap', marginHorizontal:20, justifyContent:'center'}
  });
export default DetalhesPDIScreen;