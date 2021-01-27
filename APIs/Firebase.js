import * as firebase from 'firebase/app';
import * as Google from 'expo-google-app-auth';
import 'firebase/database';
import 'firebase/auth';


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
    static async recoverKey(callback) {
        await firebase.database().ref("APIkey").once("value", API => {
            var a = API.val()
            callback(a)
        });

    }

    static writeUser(CPF, Nome) {
        UserRef.ref(CPF).set({
            Nome: Nome
        })
    }

    static writeComment(IdPDI, Ratting, Body, CPFUser = "CPFPlaceholder") {
        firebase.database().ref("CommentPDI/" + IdPDI).push({
            Avaliação: Ratting,
            CPFUsuario: CPFUser,
            Corpo: Body
        })

    }

    static returnComments(IdPDI, callback) {
        firebase.database().ref("CommentPDI/" + IdPDI).on("value", listComment => {
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
        firebase.database().ref("CommentPDI/" + IdPDI +'/'+ IdComment).remove()
    }

    static editComment(IdPDI,IdComment,Ratting,Body, CPFUser = "CPFPlaceholder"){
        firebase.database().ref("CommentPDI/" + IdPDI +'/' +  IdComment).set({ 
            Avaliação: Ratting,
            CPFUsuario: CPFUser,
            Corpo: Body
        })
    }

    static logOut() {
        firebase.auth().signOut()
    }

    static InitfirebaseAuth(callback) {
        firebase.auth().onAuthStateChanged(function (user) {
            var name = ''
            var ProfilePicUrl = null
            var _logged = false
            var Uid = ''
            if (user) {
                _logged = true
                name = user.displayName
                ProfilePicUrl = user.photoURL
                Uid = user.uid
            }
            callback({ name, _logged, ProfilePicUrl, Uid })
        })
    }

    static signInWithGoogleAsync = async () => {
        try {
            const googleUser = await Google.logInAsync({
                androidClientId: '527171682789-np1llqvpcogrreur0b9e7mlc1bgmoqap.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            if (googleUser.type === 'success') {
                console.log("teste")
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                firebase.auth().signInWithCredential(credential)

                return googleUser.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log("Erro")
            return { error: true };
        }
    };
}
