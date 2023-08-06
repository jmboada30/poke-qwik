import { component$ } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-imagen';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

// Page/Componente a renderizar en la pagina /
export default component$(() => {
  const nav = useNavigate();
  const {
    isPokemonVisible,
    nextPokemon,
    pokemonId,
    prevPokemon,
    showBackImage,
    toggleBackImage,
    toggleVisibleImage,
  } = usePokemonGame();

  return (
    <>
      <span class="text-2xl">Busqueda Simple</span>

      <span class="text-9xl"> {pokemonId.value}</span>

      <div onClick$={() => nav(`/pokemon/${pokemonId.value}`)}>
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mt-2">
        <button class="btn btn-primary mr-2" onClick$={prevPokemon}>
          Regresar
        </button>

        <button class="btn btn-primary mr-2" onClick$={nextPokemon}>
          Siguiente
        </button>

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

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Aprendiendo Qwik',
    },
  ],
};
