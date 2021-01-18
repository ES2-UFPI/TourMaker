import * as firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCM03bfY4P0k_t0oPbXoQUAUPeh_gquj6A",
    authDomain: "tourmaker-b807b.firebaseapp.com",
    databaseURL: "https://tourmaker-b807b-default-rtdb.firebaseio.com",
    projectId: "tourmaker-b807b",
    storageBucket: "tourmaker-b807b.appspot.com",
    messagingSenderId: "261858594307",
    appId: "1:261858594307:web:7182e28903d8d3490bc836"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var UserRef = firebase.database().ref('Usuario/')



export default class FirebaseFunctions {
    static async recoverKey(callback){
        await firebase.database().ref("APIkey").once("value",API =>{
            var a = API.val()
            callback(a)
        });
        
    }

    static writeUser(CPF,Nome) {
        UserRef.ref(CPF).set({
            Nome: Nome
        })
    }

    static writeComment(IdPDI,Ratting,Body,CPFUser = "CPFPlaceholder"){
        firebase.database().ref("CommentPDI/" + IdPDI).push({ 
            Avaliação: Ratting,
            CPFUsuario: CPFUser,
            Corpo: Body
        }) 
        
    }

    static returnComments(IdPDI,callback){
        firebase.database().ref("CommentPDI/" + IdPDI).once("value",listComment=>{
            var lista = []
            listComment.forEach(element => {
                let comment = element.val()

                comment["key"] = element.key
                lista.push(comment);
            });
            callback(lista)
        })
    }
    static deleteComment(IdPDI,IdComment){
        firebase.database().ref("CommentPDI/" + IdPDI + IdComment).remove()
    }

    static editComment(IdPDI,IdComment,Ratting,Body, CPFUser = "CPFPlaceholder"){
        firebase.database().ref("CommentPDI/" + IdPDI + IdComment).set({ 
            Avaliação: Ratting,
            CPFUsuario: CPFUser,
            Corpo: Body
        })
    }
}