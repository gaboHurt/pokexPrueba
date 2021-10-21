let limit = 20,
  page = 0,
  offset = page * limit;
const POKE_API = `https://pokeapi.co/api/v2`,
  POKEMONS = `${POKE_API}/pokemon?offset=${offset}&limit=${limit}`,
  PAGINATION_POKEMON = `${POKEMONS}?limit=20&offset=0"`;

let pokeFav = [];

export default {
  POKE_API,
  POKEMONS,
  PAGINATION_POKEMON,
  pokeFav,
  page,
};
