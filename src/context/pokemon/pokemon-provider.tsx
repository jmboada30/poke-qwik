import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  type PokemonGameState,
  PokemonGameContext,
} from './pokemon-game.context';
import {
  type PokemonListState,
  PokemonListContext,
} from './pokemon-list.context';

// Un provider nos sirve para proveer un contexto a todos los componentes que esten dentro de el
// En este caso, todos los componentes que esten dentro de PokemonProvider van a tener acceso
// a los valores de pokemonGame y pokemonList
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

  // El useContextProvider es el que se encarga de proveer el contexto a los componentes
  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  // Este useVisibleTask se ejecuta en el browser una sola vez cuando se carga la pagina
  useVisibleTask$(() => {
    if (localStorage.getItem('pokemon-game')) {
      const data = localStorage.getItem('pokemon-game')!;
      const pokemon = JSON.parse(data) as PokemonGameState;
      pokemonGame.pokemonId = pokemon.pokemonId;
      pokemonGame.isPokemonVisible = pokemon.isPokemonVisible;
      pokemonGame.showBackImage = pokemon.showBackImage;
    }
  });

  // Este useVisibleTask se ejecuta en el browser cada vez que cambia el estado de pokemonGame
  // Porque se esta rastreando (track)
  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
