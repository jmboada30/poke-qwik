import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-imagen";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import { PokemonSmall } from "~/interfaces";

export interface PokemonState {
  currentPage: number;
  pokemons: PokemonSmall[];
}
export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    pokemons: [],
  });

  // el useVisibleTask$ se ejecuta del lado del cliente, por lo que
  // podemos hacer uso de la API de fetch para obtener los datos
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);

  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  // el useTask$ se ejecuta del lado del servidor PERO tambien del lado del cliente
  // y conecta el estado entre el servidor y el cliente. Primero se ejecuta del lado del servidor
  // y luego del lado del cliente
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina Actual: {pokemonState.currentPage}</span>
        <span>Loading: {false ? "Yes" : "No"}</span>
      </div>

      <div class="mt-10">
        <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage++}
        >
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
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
