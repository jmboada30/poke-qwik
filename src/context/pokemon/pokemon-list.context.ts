import { createContextId } from '@builder.io/qwik';
import { type PokemonSmall } from '~/interfaces';

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean; 
  isFinished: boolean;
  pokemons: PokemonSmall[];
}

export const PokemonListContext = createContextId<PokemonListState>(
  'pokemon-list.context'
);
