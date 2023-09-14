import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

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
const textLink = 'More details';

describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
  });
  test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const type = screen.getByText('Electric');
    expect(type).toBeInTheDocument();
  });
  test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, em que <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida.', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const weight = screen.getByText('Average weight: 6.0 kg');
    expect(weight).toBeInTheDocument();
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, em que <name> é o nome do Pokémon.', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const img = screen.getByAltText('Pikachu sprite');
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite={ false }
    />);
    const linkDetails = screen.getByRole('link', { name: textLink });
    expect(linkDetails).toHaveAttribute('href', '/pokemon/25');
  });
  test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    const { user } = renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite={ false }
    />);
    const linkDetails = screen.getByRole('link', { name: textLink });
    await user.click(linkDetails);
    expect(window.location.pathname).toBe(`/pokemon/${mockPokemon.id}`);
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, em que <id> é o id do Pokémon cujos detalhes se deseja ver.', async () => {
    const { user } = renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite={ false }
    />);
    const linkDetails = screen.getByRole('link', { name: textLink });
    await user.click(linkDetails);
    expect(window.location.pathname).toBe(`/pokemon/${mockPokemon.id}`);
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados.', async () => {
    renderWithRouter(<Pokemon
      pokemon={ mockPokemon }
      showDetailsLink
      isFavorite
    />);
    const favoriteStar = screen.getByRole('img', {
      name: `${mockPokemon.name} is marked as favorite`,
    });
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.png');
  });
});
