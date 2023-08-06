import { createContextId } from '@builder.io/qwik';
import { type PokemonSmall } from '~/interfaces';

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean; 
  isFinished: boolean;
  pokemons: PokemonSmall[];
}

// Aqui definimos el contexto de la lista de pokemons
// para poder usarlo en cualquier parte de la app
export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon-list.context'
);
