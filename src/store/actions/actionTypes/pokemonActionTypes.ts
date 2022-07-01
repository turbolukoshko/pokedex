export enum PokemonActionTypes {
  FETCH_POKEMON_LIST = "FETCH_POKEMON_LIST",
  FETCH_POKEMON_SUCCESS = "FETCH_POKEMON_SUCCESS",
  FETCH_POKEMON_ERROR = "FETCH_POKEMON_ERROR",
}

interface FetchPokemonListAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST;
}

export type PokemonActions = FetchPokemonListAction;
