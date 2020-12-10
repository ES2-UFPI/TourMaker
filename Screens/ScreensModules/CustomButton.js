import React, { Component } from 'react';
import { View, Button } from 'react-native';


class CustomButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: props.title,
            onPress: props.onPress,
            color: props.color
        }
    }
    render(){
        return(
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Button
                        color={this.state.color}
                        title={this.state.title}
                        onPress={this.state.onPress}
                    />
                </View>
            </View>
        )
    }
}

export default CustomButton;