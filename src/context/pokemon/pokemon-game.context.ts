import { createContextId } from '@builder.io/qwik';

export interface PokemonGameState {
  pokemonId: number;
  showBackImage: boolean;
  isPokemonVisible: boolean;
}

// Aqui definimos el contexto del juego de pokemon
// para poder usarlo en cualquier parte de la app
export const PokemonGameContext = createContextId<PokemonGameState>(
  'pokemon-game.context'
);
