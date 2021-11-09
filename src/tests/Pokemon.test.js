import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('Testando o Pokemon', () => {
  const listIdFavorite = {};
  data.forEach(pokemon => {
    listIdFavorite[pokemon.id] = false;
  });

  data.forEach((pokemon, i) => {
    test(`06 - ${pokemon.name}`, () => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={pokemon} isFavorite={listIdFavorite.id} />,
      );

      const namePokEl = screen.getByTestId('pokemon-name');
      expect(namePokEl).toBeInTheDocument();
      expect(namePokEl).toHaveTextContent(pokemon.name);

      const typePokEl = screen.getByTestId('pokemon-type');
      expect(typePokEl).toBeInTheDocument();
      expect(typePokEl).toHaveTextContent(pokemon.type);

      const weightPokEl = screen.getByTestId('pokemon-weight');
      expect(weightPokEl).toBeInTheDocument();
      expect(weightPokEl).toHaveTextContent(
        `Average weight: ${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
      );

      const imgPokEl = screen.getByRole('img', {
        name: `${pokemon.name} sprite`,
      });
      expect(imgPokEl).toBeInTheDocument();
      expect(imgPokEl.src).toBe(pokemon.image);
    });

    test(`06 - ${pokemon.name} test url details`, () => {
      const { history } = renderWithRouter(<App />);
      expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();

      while (pokemon.name !== screen.getByTestId('pokemon-name').innerHTML) {
        const nextButton = screen.getByTestId('next-pokemon');
        userEvent.click(nextButton);
      }

      const linkEl = screen.getByRole('link', { name: /more details/i });
      expect(linkEl).toBeInTheDocument();
      userEvent.click(linkEl);

      expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);

      userEvent.click(screen.getByRole('checkbox'));

      const imgFavEl = screen.queryByRole('img', {
        name: `${pokemon.name} is marked as favorite`,
      });
      expect(imgFavEl).toBeInTheDocument();
      expect(imgFavEl.src).toBe('http://localhost/star-icon.svg');
    });
  });
});
