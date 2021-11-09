import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

const pokemonsIdsFavorites = data => {
  const result = {};
  data.forEach(pokemon => {
    result[pokemon.id] = false;
  });
  return result;
};

const testNextPokemon = data => {
  data.forEach(pokemon => {
    const pokNameEl = screen.getByTestId('pokemon-name');
    expect(pokNameEl).toHaveTextContent(pokemon.name);

    const imgPok = screen.getAllByRole('img', { name: /sprite/i });
    expect(imgPok).toHaveLength(1);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);
  });
};

describe('Testando o Pokedex', () => {
  test('05', () => {
    const { history } = renderWithRouter(
      <Pokedex
        pokemons={data}
        isPokemonFavoriteById={pokemonsIdsFavorites(data)}
      />,
    );

    const h2El = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2El).toBeInTheDocument();
    
    // TESTA TODOS OS POKEMONS
    testNextPokemon(data);

    const pokNameEl = screen.getByTestId('pokemon-name');
    expect(pokNameEl).toHaveTextContent('Pikachu');

    // TODOS TIPOS DE BOTÃO
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    const allButtonsType = screen.getAllByTestId(/pokemon-type-button/i);
    const uniqueTypes = [];
    const allTypes = data.map(pokemon => pokemon.type);
    allTypes.forEach(type => {
      if (!uniqueTypes.includes(type)) {
        uniqueTypes.push(type);
      }
    });

    allButtonsType.forEach((button, i) => {
      expect(button).toHaveTextContent(uniqueTypes[i]);
      userEvent.click(button);
      const dataType = data.filter(
        pokemon => pokemon.type === button.innerHTML,
      );
      testNextPokemon(dataType);
    });

    userEvent.click(buttonAll);
    testNextPokemon(data);

  });
});
