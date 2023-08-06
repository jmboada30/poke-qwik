import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';

import NavBar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonGameContext, type PokemonGameState } from '~/context';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    showBackImage: false,
    isPokemonVisible: true,
    pokemonId: 6,
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  return (
    <>
      <NavBar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
