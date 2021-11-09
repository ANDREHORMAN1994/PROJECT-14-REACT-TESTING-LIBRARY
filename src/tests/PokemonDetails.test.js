import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testando o PokemonDetails', () => {
  test('07', () => {
    const { history } = renderWithRouter(<App />);

    data.forEach(pokemon => {
      while (pokemon.name !== screen.getByTestId('pokemon-name').innerHTML) {
        const nextButton = screen.getByTestId('next-pokemon');
        userEvent.click(nextButton);
      }

      const detailsLink = screen.getByRole('link', { name: /more details/i });
      expect(detailsLink).toBeInTheDocument();
      userEvent.click(detailsLink);
      expect(detailsLink).not.toBeInTheDocument();

      expect(
        screen.getByRole('heading', {
          name: /Summary/i,
        }),
      );

      expect(
        screen.getByRole('heading', {
          name: `${pokemon.name} Details`,
        }),
      );

      expect(
        screen.getByRole('heading', {
          name: `Game Locations of ${pokemon.name}`,
        }),
      );

      expect(screen.getByText(pokemon.summary)).toBeInTheDocument();

      pokemon.foundAt.forEach((local, i) => {
        expect(screen.getByText(local.location)).toBeInTheDocument();
        expect(
          screen.getAllByRole('img', { name: `${pokemon.name} location` })[i],
        ).toHaveAttribute('src', local.map);
      });

      const check = screen.getByLabelText(/Pokémon favoritado/i);
      expect(check).toBeInTheDocument();
      userEvent.click(check);

      history.push('/');
    });
  });
});
