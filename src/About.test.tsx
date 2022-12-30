import React from 'react';
import { render, screen } from '@testing-library/react';
import About from "./About";

test('Basic About', () => {
  render(<About />);
  const linkElement = screen.getByText("About");
  expect(linkElement).toBeInTheDocument();
});
