import React from 'react';
import renderer from 'react-test-renderer';

import RoteiroAutomaticoScreen from '../Screens/RoteiroAutomaticoScreen';

describe('<RoteiroAutomaticoScreen />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<RoteiroAutomaticoScreen />).toJSON();
        expect(tree.children.length).toBe(6);
    });
});

it('renders correctly', () => {
    const tree = renderer.create(<RoteiroAutomaticoScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});