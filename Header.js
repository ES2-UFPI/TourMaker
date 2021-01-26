import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import firebaseAuthFunctions from './APIs/Firebase';
import CustomButton from './Screens/ScreensModules/CustomButton';

export default class CustomHeader extends Component {
    render(){
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 21,
              fontWeight: 'bold'
            }}
          >Tour Maker</Text>
          <CustomButton
          title={"Log in"}
          onPress={() => console.log('ok')}
          color="white"
          />
        </View>
      )
    }
    
    componentDidMount(){
      //firebaseAuthFunctions.initFirebaseAuth(data => {
        //this.setState(data);
      //})
    }
}