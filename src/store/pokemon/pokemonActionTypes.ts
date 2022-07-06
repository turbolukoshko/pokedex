import { PokemonPagination } from "./types";

export enum PokemonActionTypes {
  FETCH_POKEMON_LIST = "FETCH_POKEMON_LIST",
  FETCH_POKEMON_LIST_SUCCESS = "FETCH_POKEMON_LIST_SUCCESS",
  FETCH_POKEMON_LIST_PAGINATION = "FETCH_POKEMON_LIST_PAGINATION",
  FETCH_POKEMON_LIST_ERROR = "FETCH_POKEMON_LIST_ERROR",
}

interface FetchPokemonListAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST;
}

// TODO: add types for the payload
interface FetchPokemonListSuccessAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST_SUCCESS;
  payload: any[];
}

interface FetchPokemonListPaginationAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST_PAGINATION;
  payload: PokemonPagination;
}

interface FetchPokemonListErrorAction {
  type: PokemonActionTypes.FETCH_POKEMON_LIST_ERROR;
  payload: string | null;
}

export type PokemonActions =
  | FetchPokemonListAction
  | FetchPokemonListSuccessAction
  | FetchPokemonListPaginationAction
  | FetchPokemonListErrorAction;
