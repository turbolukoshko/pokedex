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

export const getPokemonIdFromUrl = (
  url: string | undefined,
  sliceLeft: number,
  sliceRight: number
): string | undefined => {
  const modifiedUrl = url?.slice(sliceLeft);
  return modifiedUrl?.substring(0, modifiedUrl.length - sliceRight);
};

export const isEmptyObject = (object: any) => {
  return Object.keys(object).length === 0;
};

export const randomNumber = (maxNumber: number): number => {
  return Math.floor(Math.random() * maxNumber);
};

export const getPokemonType = (pokemon: any): string => {
  const { name } = pokemon.types[0].type;
  return name;
};

export const isLastPage = (
  count: number,
  currentPage: number,
  limit: number
): boolean => {
  const totalPages = Math.ceil(count / limit);
  return totalPages <= currentPage;
};
