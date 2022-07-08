export const getPokemonNumber = (number: number): string => {
  const transformPokemonNumber = number.toString();

  if (transformPokemonNumber.length === 1) {
    return `#00${transformPokemonNumber}`;
  }

  if (transformPokemonNumber.length === 2) {
    return `#0${transformPokemonNumber}`;
  }

  return `#${transformPokemonNumber}`;
};
