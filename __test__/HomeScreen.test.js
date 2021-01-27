import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../Screens/HomeScreen';

describe('<HomeScreen />', () => {
    it('has 3 child', () => {
        const tree = renderer.create(<HomeScreen />).toJSON();
        expect(tree.children.length).toBe(4);
    });
});

it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});