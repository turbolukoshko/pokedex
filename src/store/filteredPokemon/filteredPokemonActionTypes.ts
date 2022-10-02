export enum FilteredPokemonActionsTypes {
  GET_FILTERED_POKEMON_BY_TYPE = "GET_FILTERED_POKEMON_BY_TYPE",
  GET_FILTERED_POKEMON_LIST = "GET_FILTERED_POKEMON_LIST",
}

interface GetFilteredPokemonByTypeAction {
  type: FilteredPokemonActionsTypes.GET_FILTERED_POKEMON_BY_TYPE;
}

interface GetFilteredPokemonListAction {
  type: FilteredPokemonActionsTypes.GET_FILTERED_POKEMON_LIST;
  payload: any[];
}

export type FilteredPokemonActions =
  | GetFilteredPokemonByTypeAction
  | GetFilteredPokemonListAction;
