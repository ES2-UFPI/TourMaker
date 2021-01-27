import React from 'react';
import renderer from 'react-test-renderer';

import DetalhesPDIScreen from '../Screens/DetalhesPDIScreen';

it('renders correctly', () => {
    const tree = renderer.create(<DetalhesPDIScreen
      route={{params: {
        PDI:{
          placeName: "",
          formatted_address: "",
          opening_hours: "",
          placeId: "",
          teste: true
        }
      }}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});
