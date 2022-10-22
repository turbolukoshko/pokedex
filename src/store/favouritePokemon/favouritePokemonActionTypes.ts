export interface FavouritePokemonState {
  favouritePokemonOrder: string;
}

export enum FavouritePokemonTypes {
  PASS_FAVOURITE_POKEMON_LIST = "PASS_FAVOURITE_POKEMON_LIST",
}

export type FavouritePokemonAction = {
  type: FavouritePokemonTypes.PASS_FAVOURITE_POKEMON_LIST;
  payload: string | null;
};

export type FavouritePokemonActions = FavouritePokemonAction;

export interface FavouritePokemonSelector {
  favouritePokemon: FavouritePokemonState;
}
