import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CoverFlow AI heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/CoverFlow AI/i);
  expect(headingElement).toBeInTheDocument();
});
