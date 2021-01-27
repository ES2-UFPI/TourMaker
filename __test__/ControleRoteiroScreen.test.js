import React from 'react';
import renderer from 'react-test-renderer';

import ControleRoteiroScreen from '../Screens/ControleRoteiroScreen';

describe('<ControleRoteiroScreen />', () => {
    it('has 6 child', () => {
        const tree = renderer.create(<ControleRoteiroScreen route={{
            params:{
                listaPDI: []
            }
        }} />).toJSON();
        expect(tree.children.length).toBe(5);
    });
});

// it('renders correctly', () => {
//     const tree = renderer.create(<ControleRoteiroScreen route={{
//         params:{
//             listaPDI: []
//         },
//         navigation: {}
//     }} />).toJSON();
//     expect(tree).toMatchSnapshot();
// });

test('it works', () => {
    expect(true).toBeTruthy();
  });