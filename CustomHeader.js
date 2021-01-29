import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FirebaseFunctions from './APIs/Firebase';

var _mounted

export default class CustomHeader extends Component {
  constructor(props){
    super(props)
    _mounted = true
    this.state = {
      ProfilePicUrl: null,
      Uid: "",
      _logged: false,
      name: "",
    }
  }

  componentDidMount() {
    if(_mounted){
      FirebaseFunctions.InitfirebaseAuth(data => {
        this.setState(data);
      })
    }
  }


  componentWillUnmount(){
    _mounted = false  
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 21,
            fontWeight: 'bold'
          }}
        >Tour Maker</Text>
        {this.state._logged ? (
          <TouchableOpacity onPress={() => FirebaseFunctions.logOut()}>
            <Image source={{uri:this.state.ProfilePicUrl}} style={styles.img}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => FirebaseFunctions.signInWithGoogleAsync()}>
            <Image source={require('./assets/default-user-avatar.jpg')} style={styles.img}/>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = new StyleSheet.create({
  img:{
    width: 50,
    height: 50,
    borderRadius: 25
  }
})