import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import index from '../index';
import App from '../App';

test('check if works properly', () => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );
  const n = screen.getByTestId("navigation");
  expect(n).toBeInTheDocument();
});