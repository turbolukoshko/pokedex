export const getPokemons = (limit: number = 20, offset: number = 0) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

export const getPokemon = (id: string | undefined) =>
  `https://pokeapi.co/api/v2/pokemon/${id}`;
