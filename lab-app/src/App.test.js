import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

test('renders learn react link', () => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );
  const n = screen.getByTestId("navigation");
  expect(n).toBeInTheDocument();
});
