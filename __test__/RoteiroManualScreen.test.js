import React from 'react';
import renderer from 'react-test-renderer';

import RoteiroManualScreen from '../Screens/RoteiroManualScreen';


it('renders correctly', () => {
    const tree = renderer.create(<RoteiroManualScreen route={{ params: {} }} />).toJSON();
    expect(tree).toMatchSnapshot();
});