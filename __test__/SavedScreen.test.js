import React from 'react';
import renderer from 'react-test-renderer';

import SavedScreen from '../Screens/SavedScreen';


it('renders correctly', () => {
    const tree = renderer.create(<SavedScreen route={{ params: {} }} />).toJSON();
    expect(tree).toMatchSnapshot();
});