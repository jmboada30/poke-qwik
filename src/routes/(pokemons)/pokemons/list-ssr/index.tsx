import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
  useNavigate,
} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-imagen';
import { BasicModal } from '~/components/shared/modal/basic-modal';
import { getDetailByPokemonId } from '~/helpers/get-detail-by-pokemon';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { PokemonSmall } from '~/interfaces';

export const usePokemonList = routeLoader$<PokemonSmall[]>(async (route) => {
  const { pathname, query, redirect } = route;

  const offset = Number(query.get('offset') || 0);
  if (offset < 0) throw redirect(301, pathname);
  if (isNaN(offset)) throw redirect(301, pathname);

  return await getSmallPokemons(offset);
});

// Page/Componente a renderizar en la pagina /pokemons/list-ssr
export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const nav = useNavigate();

  const currentOffset = useComputed$(() => {
    const offsetString = location.url.searchParams.get('offset');
    return Number(offsetString || 0);
  });

  const onClickNav = $((value: number) => {
    if (currentOffset.value + value < 0) return;
    nav(`/pokemons/list-ssr/?offset=${currentOffset.value + value}`);
  });

  // Modal Pokemon
  const isModalOpen = useSignal(false);
  const chatGptPokemonFact = useSignal('');
  const modalPokemon = useStore({ id: 0, name: '' });
  const showModal = $((pokemon: PokemonSmall) => {
    modalPokemon.id = pokemon.id;
    modalPokemon.name = pokemon.name;
    isModalOpen.value = true;
  });
  const closeModal = $(() => {
    isModalOpen.value = false;
  });

  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);

    if (modalPokemon.name.length > 0) {
      chatGptPokemonFact.value = '';
      getDetailByPokemonId(modalPokemon.id).then(
        (resp) => (chatGptPokemonFact.value = resp)
      );
    }
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset.value}</span>
        <span>Loading: {location.isNavigating ? 'Yes' : 'No'}</span>
      </div>

      <div class="mt-10">
        <button class="btn btn-primary mr-2" onClick$={() => onClickNav(-10)}>
          Anteriores
        </button>

        <button class="btn btn-primary mr-2" onClick$={() => onClickNav(10)}>
          Siguientes
        </button>
      </div>

      <div class="mt-5 grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {pokemons.value.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick$={() => showModal(pokemon)}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={pokemon.id} />
            <span class="capitalize">{`${pokemon.id}. ${pokemon.name}`}</span>
          </div>
        ))}
      </div>

      <BasicModal showModal={isModalOpen.value} closeFn={closeModal} persistent>
        <span q:slot="title">{modalPokemon.name}</span>
        <div q:slot="content" class="flex flex-col justify-center items-center">
          <PokemonImage id={modalPokemon.id} />
          <span>
            {chatGptPokemonFact.value !== ''
              ? chatGptPokemonFact.value
              : 'Espera un momento...'}
          </span>
        </div>
      </BasicModal>
    </>
  );
});

// Este head nos permite definir el titulo y meta tags de la pagina
export const head: DocumentHead = {
  title: 'Client SSR',
  meta: [
    {
      name: 'description',
      content: 'Esta pagina es renderizada en el servidor',
    },
  ],
};
