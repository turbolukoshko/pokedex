import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../api";

type PokemonCardType = {
  id?: string;
};

export const PokemonCard: FC = (): JSX.Element => {
  const queryParams: PokemonCardType = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const getPokemonData = useCallback(async () => {
    try {
      const result = await axios.get(getPokemon(queryParams?.id));
      setPokemon(result.data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, []);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  return (
    <>
      <h1>Pokemon Card</h1>
      <h1>{error}</h1>
    </>
  );
};
