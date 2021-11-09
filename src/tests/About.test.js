import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o About', () => {
  test('02', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const h2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeInTheDocument();

    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
