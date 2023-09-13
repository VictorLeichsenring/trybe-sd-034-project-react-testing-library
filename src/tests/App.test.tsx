import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve ter o texto Home', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });
  test('O segundo link deve ter o texto About', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });
  test('O terceiro link deve ter o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'Favorite Pokémon' })).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    await user.click(homeLink);
    expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    await user.click(aboutLink);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await user.click(favoriteLink);
    const listText = screen.getAllByText('Favorite Pokémon');
    expect(listText[0]).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
    renderWithRouter(<App />, { route: '/desconhecido' });
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
