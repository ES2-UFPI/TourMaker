import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../Screens/HomeScreen';


it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});