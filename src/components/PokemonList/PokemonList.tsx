import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonList } from "../../store/actions/actionCreators/pokemonActions";

export const PokemonList: FC = () => {
  // TODO: add types, refactoring, move request into store

  const pokemon: any = useSelector((state: any) => state.pokemon);
  const dispatch = useDispatch();

  const [pokemonList, setPokemonList] = useState<any>([]);
  const [pokemonDetails, setPokemonDetails] = useState<any>([]);

  useEffect(() => {
    const getPokemonList = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );

      setPokemonList(res.data);
    };

    getPokemonList();
  }, []);

  useEffect(() => {
    if (pokemonList.results && pokemonList.results.length) {
      const getPokemonDetails = async () => {
        pokemonList.results &&
          pokemonList.results.map(async (x: any) => {
            const res = await axios.get(x.url);
            setPokemonDetails((current: any) => [...current, res.data]);
          });
      };

      getPokemonDetails();
    }
  }, [pokemonList]);

  useEffect(() => {
    dispatch(getPokemonList());
  }, []);

  const sortedPokemonList =
    pokemonDetails && pokemonDetails.sort((a: any, b: any) => a.id - b.id);

  return (
    <main>
      Pokemon List
      <ul>
        {sortedPokemonList.map((x: any) => (
          <li>{x.name}</li>
        ))}
      </ul>
    </main>
  );
};
