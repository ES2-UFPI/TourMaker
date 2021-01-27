import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Styles from '../Styles';

const TableButton = (index, functionCall, text) => (
    <TouchableOpacity onPress={() => {functionCall(index)}}>
        <View style={Styles.TableButtons}>
            <Text style={Styles.TableButtonsText}>{text}</Text>
        </View>
    </TouchableOpacity>
);

export default TableButton;