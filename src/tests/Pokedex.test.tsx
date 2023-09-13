import { screen } from '@testing-library/react';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    const mockFavoritePokemonIdsObj = {
      1: true,
    };
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);

    const element = screen.getByText('Encountered Pokémon');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H2');
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', async () => {
    const mockFavoritePokemonIdsObj = {
      25: true,
      4: false,
      10: false,
    };
    const { user } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    const nextButton = screen.getByText('Próximo Pokémon');
    await user.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {});
  test('Teste se a Pokédex tem os botões de filtro:', () => {});
  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {});
});
