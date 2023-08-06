import { Slot, component$, useContextProvider, useStore } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { type PokemonListState, PokemonListContext } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

  const pokemonGame = useStore<PokemonGameState>({
    showBackImage: false,
    isPokemonVisible: true,
    pokemonId: 6,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isFinished: false,
    isLoading: true,
    pokemons: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);
  return <Slot />;
});
