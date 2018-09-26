import React from 'react';
import ReactDOM from 'react-dom';
import Episode from './Episode';

it('Episode component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Episode />, div);
  ReactDOM.unmountComponentAtNode(div);
});
