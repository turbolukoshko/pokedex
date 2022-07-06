import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import { PokemonSelectorState } from "../../store/pokemon/types";

export const PokemonList: FC = () => {
  const pokemon = useSelector((state: PokemonSelectorState) => state.pokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonList());
  }, [dispatch]);

  return (
    <main>
      Pokemon List
      <ul>
        {pokemon.data.map((x) => (
          <li>{x.name}</li>
        ))}
      </ul>
    </main>
  );
};
