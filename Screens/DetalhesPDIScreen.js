import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import FirebaseFunctions from'../APIs/Firebase.js';
import ReactMaps from '../APIs/ReactMaps';
import StarRating from './ScreensModules/StarRating.js';


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
            tableHead: ["Nota", "Usuário", "Comentário"],
            id : props.route.params.PDI.placeId,
            avaliando : false,
            newRating : null,
            newComment : "",
            mediaAval : 0
        }
        this.recuperaComments()
        
        ReactMaps.getPhotoByReference(props.route.params.PDI.gallery, (result) => {
            this.setState({
                gallery : {
                    uri: result
                }
            })
        })
    }
    recuperaComments(){
        var comments = []
        var qtd = 0
        var mediaAval = 0
        FirebaseFunctions.returnComments(this.state.id, (result) => {
            var tam = result.length
            for(var i = 0; i < tam; i++){
                if(result[i].Corpo !== ''){
                    comments.push([result[i].Avaliação,result[i].CPFUsuario, result[i].Corpo])
                }
                qtd += 1
                mediaAval += result[i].Avaliação
            }
            mediaAval = mediaAval/qtd
            this.setState({
                comments,
                mediaAval
            })
        })
    }
    showAval(){
        this.setState(
            {
                avaliando: !this.state.avaliando
            }
        )
    }
    setRating(value){
        this.setState({
            newRating : value+1
        })
    }
    sendAval(){
        var id = this.state.id
        var newRating = this.state.newRating !== null? this.state.newRating : 1
        var newComment = this.state.newComment
        FirebaseFunctions.writeComment(id, newRating, newComment)
        alert('Avaliação enviada com sucesso!')
        this.setState(
            {
                avaliando: !this.state.avaliando
            }
        )
        this.recuperaComments()
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
            {
                    !this.state.avaliando ? (
                        <TouchableOpacity onPress= {() => this.showAval()}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Avaliar</Text>
                            </View>
                        </TouchableOpacity>
                    ): (
                        <View style={{margin:10}}>
                            <StarRating getRating = {(result) => this.setRating(result)}/>
                            <TextInput style={styles.txtInpt} editable numberOfLines={1} multiline={true} placeholder='Comentário(opcional)' onChangeText={(value) => 
                                this.setState({
                                    newComment : value
                                })
                            }></TextInput>
                            <View style ={{flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableOpacity onPress= {() => this.sendAval()}>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>Enviar Avaliação</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress= {() => this.showAval()}>
                                    <View style={styles.btn}>
                                        <Text style={styles.btnText}>Cancelar Avaliação</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        
                    )
                }
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
    head: { height: 40,width: 400, backgroundColor: '#1abc9c' , flex:1},
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#f1f8ff' },
    btn: { backgroundColor: '#78B7BB',  borderRadius: 2 , borderRadius:10, marginTop:10, marginBottom:20, paddingHorizontal:5},
    btnText: { textAlign: 'center', color: '#fff' } ,
    img: {width:200, height:200, marginTop:5},
    viewText:{padding: 10, alignItems:'center', backgroundColor:'#c5fcf1',alignSelf:'stretch', margin:5, borderRadius:50, borderWidth:1, borderColor:'#1abc9c'},
    viewAddress:{alignSelf:'stretch', flexDirection:'row', flexWrap:'wrap', marginHorizontal:20, justifyContent:'center'},
    txtInpt :{borderWidth:1, width:250, maxHeight:75, marginTop:10, paddingLeft:4}
  });
export default DetalhesPDIScreen;