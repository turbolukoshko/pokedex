import { pokemonReducer } from "./../pokemon/pokemonReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});
