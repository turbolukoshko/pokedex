export const pokeapi = (limit: number = 20, offset: number = 0) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
