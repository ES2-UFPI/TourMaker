import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';


class StarRating extends Component{
    constructor(props){
        super(props)
        var maxRating = props.maxRating != undefined ? props.maxRating : 5
        var actualRating = props.actualRating != undefined ? props.actualRating : 0
        var ratingList = []
        for(var i = 0; i < maxRating; i++){
            
            if(i <= actualRating){
                ratingList.push(true)
            }
            else{
                ratingList.push(false)
            }
        }
        this.state = {
            ratingList : ratingList,
        }
    }
    handleClickStar = (index) => {
        var ratingList = this.state.ratingList
        for(var i = 0; i < ratingList.length; i++){
            if(i <= index){
                ratingList[i] = true
            }
            else{
                ratingList[i] = false
            }
        }
        this.setState({
            ratingList
        })
        if (this.props.getRating!= undefined){
            this.props.getRating(index)
        }
    }
    render(){
        const star_blank = (
            <Image
            style={styles.star}
            source={require('./Blank_Star.png')}
            />
        )
        const star_filled = (
            <Image
            style={styles.star}
            source={require('./Filled_Star.png')}
            />
        )
        return(
            <View style={{flexDirection: 'row'}}>
                {
                    this.state.ratingList.map((element, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => this.handleClickStar(index)}>
                                {element? star_filled : star_blank}
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    star: {
        width: 40,
        height: 40,
      },
    
});
export default StarRating;