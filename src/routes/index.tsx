import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-imagen';

export default component$(() => {
  const pokemonId = useSignal(1);
  const showBackImage = useSignal(false);
  const isVisible = useSignal(true);

  const onPokemonIdChange = $((value: number) => {
    const newValue = pokemonId.value + value;
    if (newValue <= 0) return;
    pokemonId.value = newValue;
  });

  return (
    <>
      <span class="text-2xl">Busqueda Simple</span>

      <span class="text-9xl"> {pokemonId}</span>

      <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={isVisible.value}/>

      <div class="mt-2">
        <button class="btn btn-primary mr-2" onClick$={() => onPokemonIdChange(-1)}>
          Regresar
        </button>

        <button class="btn btn-primary mr-2" onClick$={() => onPokemonIdChange(+1)}>
          Siguiente
        </button>
        
        <button class="btn btn-primary mr-2" onClick$={() => showBackImage.value = !showBackImage.value}>
          Voltear
        </button>

        <button class="btn btn-primary" onClick$={() => isVisible.value = !isVisible.value}>
          {isVisible.value ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Aprendiendo Qwik',
    },
  ],
};
