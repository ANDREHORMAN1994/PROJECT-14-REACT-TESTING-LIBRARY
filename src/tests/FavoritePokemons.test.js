import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const favoritePokemon = () => {
  const checkbox = screen.getByRole('checkbox');
  const imgFavoriteNot = screen.queryByRole('img', {
    name: /pikachu is marked/i,
  });

  expect(imgFavoriteNot).not.toBeInTheDocument();
  userEvent.click(checkbox);
  const imgFavorite = screen.getByRole('img', { name: /is marked/i });
  expect(imgFavorite).toBeInTheDocument();
};

describe('Testando o FavoritePokemon', () => {
  test('03', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const pEl = screen.getByText(/No favorite pokemon found/i);
    expect(pEl).toBeInTheDocument();

    data.forEach(pokemon => {
      history.push(`/pokemons/${pokemon.id}`);
      favoritePokemon();
    });

    history.push('/favorites');
    const allLinksDetails = screen.getAllByRole('link', {
      name: /more details/i,
    });
    expect(allLinksDetails).toHaveLength(data.length);
  });
});
