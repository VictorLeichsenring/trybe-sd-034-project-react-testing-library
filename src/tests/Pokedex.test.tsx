import { screen } from '@testing-library/react';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.tsx />', () => {
  const mockFavoritePokemonIdsObj = {
    1: true,
    25: true,
    4: false,
    10: false,
  };

  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);

    const element = screen.getByText('Encountered Pokémon');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H2');
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', async () => {
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

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);
    const displayedPokemons = screen.getAllByTestId('pokemon-name');
    expect(displayedPokemons.length).toBe(1);
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonTypes = typeButtons.map((button) => button.textContent);

    const uniqueTypes = [...new Set(pokemonList.map((pokemon) => pokemon.type))];
    uniqueTypes.forEach((type) => {
      const countOfType = buttonTypes.filter((buttonType) => buttonType === type).length;
      expect(countOfType).toBe(1);
    });
  });
  test('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo.', async () => {
    const { user } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);

    const fireTypeButton = screen.getByText('Fire');
    await user.click(fireTypeButton);

    const displayedPokemonType = screen.getByTestId('pokemon-type');
    expect(displayedPokemonType.textContent).toBe('Fire');

    const nextButton = screen.getByText('Próximo Pokémon');
    await user.click(nextButton);
    const nextDisplayedPokemonType = screen.getByTestId('pokemon-type');
    expect(nextDisplayedPokemonType.textContent).toBe('Fire');
  });
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });
  test('A Pokedéx deve mostrar os Pokémon sem filtros ao clicar no botão All.', async () => {
    const { user } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);

    // Suponhamos que você tenha um botão de filtro para "Fire" Pokémon e que clique nele.
    const fireButton = screen.getByText('Fire');
    await user.click(fireButton);

    // Agora você clica no botão "All" para remover os filtros.
    const allButton = screen.getByText('All');
    await user.click(allButton);

    // Você verifica se o primeiro Pokémon exibido após clicar em "All" é o primeiro Pokémon da sua lista.
    const firstPokemon = pokemonList[0].name;
    expect(screen.getByText(firstPokemon)).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro.', async () => {
    const { user } = renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      favoritePokemonIdsObj={ mockFavoritePokemonIdsObj }
    />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    const allButton = screen.getByText('All');
    const bugButton = screen.getByText('Bug');
    await user.click(bugButton);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    await user.click(allButton);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
