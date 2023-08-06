import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-imagen';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { type PokemonSmall } from '~/interfaces';

export interface PokemonState {
  currentPage: number;
  isLoading: boolean;
  isFinished: boolean;
  pokemons: PokemonSmall[];
}

// Componente a renderizar en la pagina /pokemons/list-client
// se va a renderizar en el cliente
export default component$(() => {
  const pokemonList = useContext(PokemonListContext);

  useTask$(async ({ track }) => {
    track(() => pokemonList.currentPage);

    const pokemons = await getSmallPokemons(pokemonList.currentPage * 10, 30);
    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];
    pokemonList.isFinished = pokemons.length === 0;
    pokemonList.isLoading = false;
  });

  // Este useOnDocument se ejecuta en el browser cada vez que se hace scroll
  useOnDocument(
    'scroll',
    $(() => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (
        currentScroll + 200 >= maxScroll &&
        !pokemonList.isLoading &&
        !pokemonList.isFinished
      ) {
        pokemonList.isLoading = true;
        pokemonList.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina Actual: {pokemonList.currentPage}</span>
        <span>Cargando: {pokemonList.isLoading ? 'Si' : 'No'}</span>
      </div>

      <div class="mt-5 grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {pokemonList.pokemons.map(({ name, id }, idx) => (
          <div key={idx} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize">{`${id}. ${name}`}</span>
          </div>
        ))}
      </div>
    </>
  );
});

// Este head se va a renderizar en el cliente
// y nos permite cambiar el titulo de la pagina y los meta tags
export const head: DocumentHead = {
  title: 'Client List',
  meta: [
    {
      name: 'description',
      content: 'Esta pagina es renderizada en el cliente',
    },
  ],
};
