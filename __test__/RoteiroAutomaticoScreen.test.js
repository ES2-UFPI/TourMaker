import React from 'react';
import renderer from 'react-test-renderer';

import RoteiroAutomaticoScreen from '../Screens/RoteiroAutomaticoScreen';


it('renders correctly', () => {
    const tree = renderer.create(<RoteiroAutomaticoScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});