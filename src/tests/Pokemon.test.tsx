import { screen, render } from '@testing-library/react';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.tsx />', () => {
  const mockPokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };
  const linkText = 'More details';

  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const { container } = render(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const type = screen.getByText('Electric');
    expect(type).toBeInTheDocument();
    const averageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();
    const image = container.querySelector('img');
    expect(image?.src).toBe(mockPokemon.image);
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite={ false }
    />);
    const link = screen.getByRole('link', { name: linkText });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(`/pokemon/${mockPokemon.id}`);
  });
  test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    const { user } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: linkText });
    await user.click(link);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, em que <id> é o id do Pokémon cujos detalhes se deseja ver.', async () => {
    const { user } = renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite={ false }
    />);
    const link = screen.getByRole('link', { name: linkText });
    await user.click(link);
    expect(window.location.pathname).toBe(`/pokemon/${mockPokemon.id}`);
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite
    />);
    const favoriteIcon = screen.getByRole('img', {
      name: `${mockPokemon.name} is marked as favorite`,
    });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.png');
  });
});
