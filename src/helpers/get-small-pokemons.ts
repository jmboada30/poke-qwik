import type { PokemonListResponse, PokemonSmall } from '~/interfaces';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

// Petición a la API de pokemon para obtener los pokemons de forma paginada
export const getSmallPokemons = async (
  offset = 0,
  limit = 10
): Promise<PokemonSmall[]> => {
  const resp = await fetch(`${baseUrl}?offset=${offset}&limit=${limit}`);
  const data = (await resp.json()) as PokemonListResponse;

  return data.results.map((pokemon) => {
    const urlParts = pokemon.url.split('/');
    const id = urlParts.at(-2)!;
    return {
      id: Number(id),
      name: pokemon.name,
    };
  });
};
