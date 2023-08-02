import { $, component$, useComputed$, useSignal } from "@builder.io/qwik";
import {
  DocumentHead,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-imagen";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";
import type { PokemonSmall } from "~/interfaces";

export const usePokemonList = routeLoader$<PokemonSmall[]>(async (route) => {
  const { pathname, query, redirect } = route;

  const offset = Number(query.get("offset") || 0);
  if (offset < 0) throw redirect(301, pathname);
  if (isNaN(offset)) throw redirect(301, pathname);

  return await getSmallPokemons(offset);
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const nav = useNavigate();

  const currentOffset = useComputed$(() => {
    const offsetString = location.url.searchParams.get("offset");
    return Number(offsetString || 0);
  });

  const onClickNav = $((value: number) => {
    if (currentOffset.value + value < 0) return;
    nav(`/pokemons/list-ssr/?offset=${currentOffset.value + value}`);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset.value}</span>
        <span>Loading: {location.isNavigating ? "Yes" : "No"}</span>
      </div>

      <div class="mt-10">
        <button class="btn btn-primary mr-2" onClick$={() => onClickNav(-10)}>
          Anteriores
        </button>

        <button class="btn btn-primary mr-2" onClick$={() => onClickNav(10)}>
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} />
            <span class="capitalize">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Client SSR",
  meta: [
    {
      name: "description",
      content: "Esta pagina es renderizada en el servidor",
    },
  ],
};
