import { $, component$, useContext } from '@builder.io/qwik';
import { useNavigate, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-imagen';
import { PokemonGameContext } from '~/context';

export default component$(() => {
  const pokemonGame = useContext(PokemonGameContext);
  const nav = useNavigate();

  const onPokemonIdChange = $((value: number) => {
    const newValue = pokemonGame.pokemonId + value;
    if (newValue <= 0) return;
    pokemonGame.pokemonId = newValue;
  });

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonGame.pokemonId}`);
  });

  return (
    <>
      <span class="text-2xl">Busqueda Simple</span>

      <span class="text-9xl"> {pokemonGame.pokemonId}</span>

      <div onClick$={() => goToPokemon()}>
        <PokemonImage
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
        />
      </div>
      <div class="mt-2">
        <button
          class="btn btn-primary mr-2"
          onClick$={() => onPokemonIdChange(-1)}
        >
          Regresar
        </button>

        <button
          class="btn btn-primary mr-2"
          onClick$={() => onPokemonIdChange(+1)}
        >
          Siguiente
        </button>

        <button
          class="btn btn-primary mr-2"
          onClick$={() =>
            (pokemonGame.showBackImage = !pokemonGame.showBackImage)
          }
        >
          Voltear
        </button>

        <button
          class="btn btn-primary"
          onClick$={() =>
            (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
          }
        >
          {pokemonGame.isPokemonVisible ? 'Ocultar' : 'Mostrar'}
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
