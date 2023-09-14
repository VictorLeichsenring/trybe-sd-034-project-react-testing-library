import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testar o componente <PokemonDetails.js />', () => {
  const textLink = 'More details';
  test('Testar se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    const { user } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: textLink });
    await user.click(detailsLink);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const pokemonTitle = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(pokemonTitle).toBeInTheDocument();
    const summaryTitle = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryTitle).toBeInTheDocument();
    const text = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
    expect(text).toBeInTheDocument();
    const locationTitle = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(locationTitle).toBeInTheDocument();
    const favorite = screen.getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
  });
  test('Testar se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    const { user } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: textLink });
    await user.click(detailsLink);
    const image = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(image[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Testar se o usuário pode favoritar um Pokémon através da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: textLink });
    await user.click(detailsLink);
    const checkboxinput = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkboxinput).not.toBeChecked();
    await user.click(checkboxinput);
    const favoriteimg = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteimg).toBeInTheDocument();
    expect(checkboxinput).toBeChecked();
    await user.click(checkboxinput);
    expect(favoriteimg).not.toBeInTheDocument();
    expect(checkboxinput).not.toBeChecked();
  });
});
