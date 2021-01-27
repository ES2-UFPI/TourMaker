import React from 'react';
import renderer from 'react-test-renderer';

import ControleRoteiroScreen from '../Screens/ControleRoteiroScreen';

it('renders correctly', () => {
    const tree = renderer.create(<ControleRoteiroScreen route={{
        params:{
            listaPDI: []
        }
    }} />).toJSON();
    expect(tree).toMatchSnapshot();
});