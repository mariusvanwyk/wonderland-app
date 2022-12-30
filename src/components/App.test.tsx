import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Basic App Test', () => {
  render(<App />);
  const aboutText = screen.getByText("Peter Pan | Management");
  expect(aboutText).toBeInTheDocument();
});
