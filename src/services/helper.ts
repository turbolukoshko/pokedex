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

export const modifyPokemonName = (name: string): string => {
  const firstCharacter = name[0].toUpperCase();
  const modifiedName = firstCharacter + name.substring(1);
  return modifiedName;
};
