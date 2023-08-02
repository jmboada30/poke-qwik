import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-imagen";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import { PokemonSmall } from "~/interfaces";

export interface PokemonState {
  currentPage: number;
  isLoading: boolean;
  isFinished: boolean;
  pokemons: PokemonSmall[];
}
export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    isLoading: false,
    isFinished: false,
    pokemons: [],
  });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isFinished = pokemons.length === 0;
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading && !pokemonState.isFinished) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina Actual: {pokemonState.currentPage}</span>
        <span>Cargando: {false ? "Si" : "No"}</span>
      </div>

      <div class="mt-5 grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {pokemonState.pokemons.map(({ name, id }, idx) => (
          <div key={idx} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize">{`${id}. ${name}`}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Client List",
  meta: [
    {
      name: "description",
      content: "Esta pagina es renderizada en el cliente",
    },
  ],
};
