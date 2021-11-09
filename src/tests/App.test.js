import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o App', () => {
  test('01', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    history.push('xablau');
    expect(history.location.pathname).toBe('/xablau');
    expect(
      screen.getByRole('heading', { name: /Page requested not found/i }),
    ).toBeInTheDocument();
  });
});
