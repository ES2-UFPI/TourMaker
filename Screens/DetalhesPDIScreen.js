import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';

import FirebaseFunctions from '../APIs/Firebase.js';
import ReactMaps from '../APIs/ReactMaps';

import StarRating from './ScreensModules/StarRating.js';
import CustomTable from './ScreensModules/CustomTable';
import TableButton from './ScreensModules/TableButton';

import Styles from './Styles';
var _mounted = true
const Button = ({ index, functionCall, text }) => (
    <TouchableOpacity onPress={() => { functionCall(index) }}>
        <View style={styles.btn}>
            <Text style={styles.btnText}>{text}</Text>
        </View>
    </TouchableOpacity>
);
const CreateComment = ({ sendAval, showAval, setState, setRating, state, updateAval }) => {
    return (
        <View style={{ margin: 10 }}>
            <StarRating getRating={(result) => setRating(result)} actualRating={state.newRating - 1} />
            <TextInput style={styles.txtInpt} value={state.newComment} editable numberOfLines={1} multiline={true} placeholder='Comentário(opcional)' onChangeText={(value) =>
                setState({
                    newComment: value
                })
            }></TextInput>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {!state.editing ?
                    <Button
                        functionCall={sendAval}
                        text="Enviar Avaliação"
                    />
                    :
                    <Button
                        functionCall={updateAval}
                        text="Editar Avaliação"
                    />
                }

                <Button
                    functionCall={showAval}
                    text="Cancelar Avaliação"
                />
            </View>
        </View>
    )
}
class DetalhesPDIScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: props.route.params.PDI.placeName,
            address: props.route.params.PDI.formatted_address.split(","),
            isOpen: props.route.params.PDI.opening_hours,
            gallery: null,
            tableHead: ["Nota", "Usuário", "Comentários", "Funções"],
            id: props.route.params.PDI.placeId,
            avaliando: false,
            newRating: 1,
            newComment: "",
            firebaseComments: [],
            editing: false,
            usuario: null,
            jaComentou: false,
        }
        _mounted = true,
        ReactMaps.getPhotoByReference(props.route.params.PDI.gallery, (result) => {
            this.setState({
                gallery: {
                    uri: result
                }
            })
        })
    }

    componentDidMount() {
        if (_mounted) {
            FirebaseFunctions.InitfirebaseAuth(data => {
                if (data._logged) {
                    this.setState({
                        usuario: {
                            nome: data.name,
                            id: data.Uid
                        }
                    });
                } else {
                    this.setState({
                        usuario: null
                    })
                }

            })

            FirebaseFunctions.returnComments(this.state.id, (result) => {
                this.setState({
                    firebaseComments: result
                })
            })
        }
        

    }
    componentWillUnmount() {
        _mounted = false
    }
    componentDidUpdate() {
        
        
    }
    showAval() {
        this.setState({
            avaliando: !this.state.avaliando,
            editing: false,
            newRating: 1,
            newComment: "",
        })
    }
    setRating(value) {
        this.setState({
            newRating: value + 1
        })
    }
    sendAval() {
        var id = this.state.id
        var newRating = this.state.newRating !== null ? this.state.newRating : 1
        var newComment = this.state.newComment
        var user = this.state.usuario
        FirebaseFunctions.writeComment(id, newRating, newComment, user)
        alert('Avaliação enviada com sucesso!')
        this.setState({
            avaliando: !this.state.avaliando,
            newRating: 1,
            newComment: ''
        })
    }
    deleteComment(key) {
        FirebaseFunctions.deleteComment(this.state.id, key)
    }
    editComment(comment) {
        if (!this.state.avaliando) {

            this.showAval()
        }
        this.setState({
            editing: true,
            newComment: comment.Corpo,
            newRating: comment.Avaliação,
            commentKey: comment.key
        })
    }
    updateAval() {
        var id = this.state.id
        var commentKey = this.state.commentKey
        var newRating = this.state.newRating
        var newComment = this.state.newComment
        var user = this.state.usuario
        FirebaseFunctions.editComment(id, commentKey, newRating, newComment, user)
        alert('Avaliação editada com sucesso!')
        this.setState({
            avaliando: !this.state.avaliando,
            newRating: 1,
            newComment: '',
            editing: false
        })
    }
    render() {
        var user = this.state.usuario
        var comments = this.state.firebaseComments
        var jaComentou = false
        var idUserComment = -1
        for (var i in comments){
            if (user != null && comments[i].CPFUsuario.id === user.id){
                jaComentou = true
                idUserComment = i
                break
            }
        }

        var conteudo = "Este local "
        if (this.state.isOpen != undefined) {
            conteudo += "está " + (this.state.isOpen.open_now ? "Aberto" : "Fechado")
        }
        else {
            conteudo += "não fornece dados de horário de funcionamento"
        }

        var tableData = []
        this.state.firebaseComments.map((comment, index) => {
            if (comment.Corpo !== '') {
                var element = user != null && comment.CPFUsuario.id == user.id ?
                 (<View style={{ justifyContent: 'space-between', flexDirection: 'column', height: 43 }}>
                {TableButton(comment.key, this.deleteComment.bind(this), 'Excluir')}

                {TableButton(comment, this.editComment.bind(this), 'Editar')}
                </View>) : ""
                tableData.push([comment.Avaliação,
                comment.CPFUsuario.nome,
                comment.Corpo,
                element,
                ])
            }
        })

        if (idUserComment != -1){
            var aux = tableData[0]
            tableData[0] = tableData[i]
            tableData[i] = aux
        }
        return (
            <View style={Styles.Screen}>
                <Image source={this.state.gallery} style={styles.img} />
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
                {!this.state.avaliando ?
                    this.state.usuario != null && !jaComentou?
                        <Button
                            functionCall={this.showAval.bind(this)}
                            text="Avaliar"
                        /> : null
                    : 
                        <CreateComment
                            sendAval={this.sendAval.bind(this)}
                            showAval={this.showAval.bind(this)}
                            setState={this.setState.bind(this)}
                            setRating={this.setRating.bind(this)}
                            state={this.state}
                            updateAval={this.updateAval.bind(this)}
                        />
                    }
                <CustomTable
                    tableHead={this.state.tableHead}
                    tableData={tableData}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#78B7BB',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 5
    },
    btnText: {
        textAlign: 'center',
        color: '#fff'
    },
    img: {
        width: 200,
        height: 200,
        marginTop: 5
    },
    viewText: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#c5fcf1',
        alignSelf: 'stretch',
        margin: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#1abc9c'
    },
    viewAddress: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    txtInpt: {
        borderWidth: 1,
        width: 250,
        maxHeight: 75,
        marginTop: 10,
        paddingLeft: 4
    }
});
export default DetalhesPDIScreen;