import React from 'react';
import { View, Text } from 'react-native';

export default function CustomHeader({}){
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 21,
            fontWeight: 'bold'
          }}
        >Tour Maker</Text>
      </View>
    )
}