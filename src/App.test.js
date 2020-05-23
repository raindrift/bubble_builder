import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the layout', () => {
  const {getAllByTestId, getByTestId} = render(<App />);
  expect(getAllByTestId('layout')).toHaveLength(1);
});
