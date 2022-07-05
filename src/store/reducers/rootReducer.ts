import { combineReducers } from "redux";
import { pokemonReducer } from "../pokemon/pokemonReducer";

export const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});
