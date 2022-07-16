import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import { PokemonSelectorState } from "../../store/pokemon/types";
import { Loader } from "../Loader/Loader";
import { PokemonTile } from "../PokemonTile";
import "./PokemonList.scss";

export const PokemonList: FC = (): JSX.Element => {
  const pokemon = useSelector((state: PokemonSelectorState) => state.pokemon);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getPokemonList());
  }, [dispatch]);

  const { data, loading } = pokemon;

  return (
    <main className="wrapper">
      <h1>Pokemon List</h1>
      {loading ? (
        <Loader />
      ) : (
        <ul className="pokemon__list">
          {data.map((pokemon) => {
            return (
              <PokemonTile
                pokemon={pokemon}
                key={pokemon.id}
                onClick={history}
              />
            );
          })}
        </ul>
      )}
    </main>
  );
};
