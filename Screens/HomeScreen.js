import React, { Component } from 'react';
import { View } from 'react-native';

import CustomMapView from './ScreensModules/CustomMapView';
import CustomButton from './ScreensModules/CustomButton';

import Styles from './Styles';

class HomeScreen extends Component {

    render() {
        return (
            <View style={Styles.Screen}>
                <CustomMapView
                    EnableNearbySeach={true}
                />
                <CustomButton
                    title="Criar Roteiro Automatico"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
                        this.props.navigation.push('RoteiroAutomatico', {})
                    }}
                />
                <CustomButton
                    title="Criar Roteiro Manual"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
                        this.props.navigation.push('RoteiroManual', {})
                    }}
                />
                <CustomButton
                    title="Roteiros Salvos"
                    color={Styles.NavigationButtons.color}
                    onPress={() => {
                        this.props.navigation.push('SavedRoutes', {})
                    }}
                />
            </View>
        )
    }
}

export default HomeScreen;