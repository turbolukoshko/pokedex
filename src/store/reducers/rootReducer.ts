import { combineReducers } from "redux";
import { pokemonReducer } from "./../pokemon/pokemonReducer";
import { filterReducer } from "../filteredPokemon/filteredPokemonReducer";

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  filteredPokemon: filterReducer,
});
