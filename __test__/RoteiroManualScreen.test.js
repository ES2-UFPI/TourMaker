import React from 'react';
import renderer from 'react-test-renderer';

import RoteiroManualScreen from '../Screens/RoteiroManualScreen';

describe('<RoteiroManualScreen />', () => {
    it('has 7 child', () => {
        const tree = renderer.create(<RoteiroManualScreen route={{params:{}}}/>).toJSON();
        expect(tree.children.length).toBe(7);
    });
});

it('renders correctly', () => {
    const tree = renderer.create(<RoteiroManualScreen route={{params:{}}}/>).toJSON();
    expect(tree).toMatchSnapshot();
});