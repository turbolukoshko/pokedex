export enum PokemonActionTypes {
  FETCH_POKEMON_LIST = "FETCH_POKEMON_LIST",
  FETCH_POKEMON_LIST_SUCCESS = "FETCH_POKEMON_LIST_SUCCESS",
  FETCH_POKEMON_LIST_ERROR = "FETCH_POKEMON_LIST_ERROR",
}

interface FetchPokemonListAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST;
}

interface FetchPokemonListSuccessAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST_SUCCESS;
  payload: any;
}

export type PokemonActions =
  | FetchPokemonListAction
  | FetchPokemonListSuccessAction;
