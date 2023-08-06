import { $, useComputed$, useContext } from '@builder.io/qwik';
import { PokemonGameContext } from '~/context';

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const onPokemonIdChange = $((value: number) => {
    const newValue = pokemonGame.pokemonId + value;
    if (newValue <= 0) return;
    pokemonGame.pokemonId = newValue;
  });

  const toggleBackImage = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisibleImage = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  });

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    prevPokemon: $(() => onPokemonIdChange(-1)),
    nextPokemon: $(() => onPokemonIdChange(+1)),
    toggleBackImage,
    toggleVisibleImage,
  };
};
