import { screen, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.tsx />, ao favoritar a partir da página de detalhes', () => {
  test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', async () => {
    const { user } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await user.click(favoriteLink);
    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });
  test('Apenas são exibidos os Pokémon favoritados.', async () => {
    const { user } = renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: 'More details' });
    await user.click(detailLink);
    const inputFavorite = screen.getByLabelText('Pokémon favoritado?');
    await user.click(inputFavorite);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    await user.click(favoriteLink);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });
});
