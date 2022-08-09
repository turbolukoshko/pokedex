import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../api";
import { getPokemonIdFromUrl, isEmptyObject } from "../../services/helper";
import { PokemonReusableType } from "../../types/global";
import { Loader } from "../Loader/Loader";

type PokemonEvolutionChainType = {
  name?: string | undefined;
  id?: string | undefined;
  url?: string | undefined;
};

type FilteredPokemonEvolutionChainType = {
  name: string;
  id: string;
  url: string;
};

type PokemonCardQueryType = {
  id?: string;
};

enum PokemonUnit {
  m = "m",
  kg = "kg",
}

type PokemonStatsType = {
  base_stat: number;
  effort: number;
  stat: PokemonReusableType;
};

type PokemonTypesType = {
  slots: number;
  type: PokemonReusableType;
};

type EvolutionDetailsType = {
  gender: null;
  held_item: null;
  item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: null;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: PokemonReusableType;
  turn_upside_down: boolean;
};

type EvolvesToType = {
  evolution_details: EvolutionDetailsType;
  evolves_to: Array<any>;
  is_baby: boolean;
  species: PokemonReusableType;
};

type PokemonFetchEvolutionChainType = {
  evolution_details: [];
  evolves_to: [key: EvolvesToType] | [];
  is_baby: boolean;
  species: PokemonReusableType;
};

export const PokemonCard: FC = (): JSX.Element => {
  const queryParams: PokemonCardQueryType = useParams();

  // TODO: fix types
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchEvolutionChainData, setFetchEvolutionChainData] =
    useState<PokemonFetchEvolutionChainType | null>(null);
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState<any>([]);
  const [pokemonEvolutionChainImages, setPokemonEvolutionChainImages] =
    useState<any>([]);

  const getPokemonData = useCallback(async () => {
    try {
      const result = await axios.get(getPokemon(queryParams?.id));
      setPokemon(result.data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [queryParams.id]);

  const fetchPokemonEvolutionChain = async (url: string) => {
    try {
      const getSpeciesData = await axios.get(url);
      const speciesUrl: { url: string } = getSpeciesData.data.evolution_chain;
      const getEvolutionChain = await axios.get(speciesUrl.url);

      setFetchEvolutionChainData(getEvolutionChain.data.chain);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  useEffect(() => {
    const speciesUrl: string = pokemon?.species.url;
    if (speciesUrl !== undefined) fetchPokemonEvolutionChain(speciesUrl);
  }, [pokemon]);

  useEffect(() => {
    getPokemonEvolutionChain();
    // eslint-disable-next-line
  }, [fetchEvolutionChainData]);

  const getPokemonSize = (size: number, unit: string): string | undefined => {
    let formatSize = size.toString();

    switch (!!formatSize.length) {
      case formatSize.length === 1:
        return `0.${formatSize}${unit}`;
      case formatSize.length === 2:
        return `${formatSize[0]}.${formatSize[1]}${unit}`;
      case formatSize.length === 3:
        return `${formatSize[0]}${formatSize[1]}${unit}`;
      case formatSize.length === 4:
        return `${formatSize.slice(0, 3)}${unit}`;
    }
  };

  const createEvolutionChainObject = (
    name: string | undefined,
    id: string | undefined,
    url: string | undefined
  ): PokemonEvolutionChainType => ({ name, id, url });

  const getPokemonEvolutionChain = (): void => {
    const evolutionChainFirstLevel = createEvolutionChainObject(
      fetchEvolutionChainData?.species.name,
      getPokemonIdFromUrl(fetchEvolutionChainData?.species.url, 42, 1),
      `${getPokemon(
        getPokemonIdFromUrl(fetchEvolutionChainData?.species.url, 42, 1)
      )}`
    );

    const evolutionChainSecondLevel = fetchEvolutionChainData?.evolves_to.length
      ? createEvolutionChainObject(
          fetchEvolutionChainData?.evolves_to[0].species.name,
          getPokemonIdFromUrl(
            fetchEvolutionChainData?.evolves_to[0].species.url,
            42,
            1
          ),
          `${getPokemon(
            getPokemonIdFromUrl(
              fetchEvolutionChainData?.evolves_to[0].species.url,
              42,
              1
            )
          )}`
        )
      : {};

    const evolutionChainThirdLevel = fetchEvolutionChainData?.evolves_to[0]
      ?.evolves_to.length
      ? createEvolutionChainObject(
          fetchEvolutionChainData?.evolves_to[0]?.evolves_to[0].species.name,
          getPokemonIdFromUrl(
            fetchEvolutionChainData?.evolves_to[0]?.evolves_to[0].species.url,
            42,
            1
          ),
          `${getPokemon(
            getPokemonIdFromUrl(
              fetchEvolutionChainData?.evolves_to[0]?.evolves_to[0].species.url,
              42,
              1
            )
          )}`
        )
      : {};

    setPokemonEvolutionChain([
      evolutionChainFirstLevel,
      evolutionChainSecondLevel,
      evolutionChainThirdLevel,
    ]);
  };

  const filterPokemonEvolutionChain: FilteredPokemonEvolutionChainType[] =
    pokemonEvolutionChain.filter(
      (evolutionChain: PokemonEvolutionChainType) =>
        !isEmptyObject(evolutionChain)
    );

  const getUrlFromPokemonEvolutionChain = filterPokemonEvolutionChain.map(
    (pokemonOption: FilteredPokemonEvolutionChainType) => pokemonOption.url
  );

  const getPokemonEvolutionChainImages = (): void => {
    if (!getUrlFromPokemonEvolutionChain[0]?.includes("undefined")) {
      getUrlFromPokemonEvolutionChain.map(
        async (pokemonEvolutionChain: string) => {
          if (pokemonEvolutionChain !== undefined) {
            const images = await axios.get(pokemonEvolutionChain);

            setPokemonEvolutionChainImages((prev: []) => [
              ...prev,
              images.data.sprites.other.dream_world.front_default,
            ]);
          }
        }
      );
    }
  };

  const sortedPokemonEvolutionChainImages: [] =
    pokemonEvolutionChainImages.sort(
      (pokemonImage: string, comparablePokemonImage: string) => {
        const img = getPokemonIdFromUrl(pokemonImage, 91, 4);
        const comparableImg = getPokemonIdFromUrl(
          comparablePokemonImage,
          91,
          4
        );

        return Number(img) - Number(comparableImg);
      }
    );

  useEffect(() => {
    getPokemonEvolutionChainImages();
    // eslint-disable-next-line
  }, [pokemonEvolutionChain]);

  return pokemon ? (
    <section className="pokemon-card">
      <div className="pokemon-card__info">
        <div className="pokemon-card__info-image">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="pokemon-card__info-description">
          <h1>{pokemon.name}</h1>
          <h1>{getPokemonSize(pokemon.height, PokemonUnit.m)}</h1>
          <h1>{getPokemonSize(pokemon.weight, PokemonUnit.kg)}</h1>
        </div>
        <div className="pokemon-card__info-stats">
          <ul>
            {pokemon.stats.map((stat: PokemonStatsType, index: number) => (
              <li key={index}>
                <p>
                  {stat.stat.name}: {stat.base_stat}
                </p>
                <p>effort: {stat.effort}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="pokemon-card__info-types">
          <ul>
            {pokemon.types.map((type: PokemonTypesType, index: number) => (
              <li key={index}>type: {type.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pokemon-card__evolution">
        Evolution chain:
        <ul>
          {filterPokemonEvolutionChain.map((x: any, index: number) => (
            <>
              <li>{x.name}</li>
              <img
                src={sortedPokemonEvolutionChainImages[index]}
                alt="pokemon-evolution-chain"
              />
            </>
          ))}
        </ul>
      </div>
      <h1>{error}</h1>
    </section>
  ) : (
    <Loader />
  );
};
