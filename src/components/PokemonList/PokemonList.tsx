import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPokemonList } from "../../store/pokemon/pokemonActions";
import { PokemonSelectorState } from "../../store/pokemon/types";
import { Loader } from "../Loader/Loader";
import { PokemonTile } from "../PokemonTile";
import "./PokemonList.scss";

type PaginationData = {
  limit: number;
  offset: number;
};

export const PokemonList: FC = (): JSX.Element => {
  const pokemon = useSelector((state: PokemonSelectorState) => state.pokemon);
  const [paginationData, setPaginationData] = useState<PaginationData>({
    limit: 20,
    offset: 0,
  });
  const dispatch = useDispatch();
  const history = useNavigate();
  const { limit, offset } = paginationData;

  useEffect(() => {
    dispatch(getPokemonList(limit, offset));
  }, [dispatch, limit, offset]);

  const { data, loading, next, count } = pokemon;

  return (
    <main className="wrapper">
      <h1>Pokemon List</h1>
      {loading ? (
        <Loader />
      ) : (
        <main className="pokemon__main">
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
          <div>
            <button
              onClick={() =>
                setPaginationData({
                  ...paginationData,
                  offset: paginationData.offset - 20,
                })
              }
              disabled={paginationData.offset < 20}
            >
              Prev
            </button>
            <button
              onClick={() =>
                setPaginationData({
                  ...paginationData,
                  offset: paginationData.offset + 20,
                })
              }
            >
              Next
            </button>
          </div>
        </main>
      )}
    </main>
  );
};
