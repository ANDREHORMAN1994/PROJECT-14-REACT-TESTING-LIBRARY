import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testando o NotFound', () => {
  test('04', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const h2El = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    const imgEl = screen.getByRole('img', { name: /pikachu crying/i });
    expect(h2El).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
