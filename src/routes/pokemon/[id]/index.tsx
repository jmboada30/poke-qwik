import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-imagen';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) throw redirect(301, '/');
  if (id <= 0) throw redirect(301, '/');
  if (id > 1000) throw redirect(301, '/');
  return id;
});

export default component$(() => {
  const pokemonId = usePokemonId();
  const {
    isPokemonVisible,
    showBackImage,
    toggleBackImage,
    toggleVisibleImage,
  } = usePokemonGame();
  return (
    <>
      <span class="text-5xl">Pokemon: {pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />

      <div class="mt-2">
        <button class="btn btn-primary mr-2" onClick$={toggleBackImage}>
          Voltear
        </button>

        <button class="btn btn-primary" onClick$={toggleVisibleImage}>
          {isPokemonVisible.value ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </>
  );
});
