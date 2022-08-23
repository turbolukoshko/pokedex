import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemon } from "../../api";
import {
  getPokemonIdFromUrl,
  getPokemonNumber,
  isEmptyObject,
  modifyPokemonName,
} from "../../services/helper";
import { PokemonReusableType } from "../../types/global";
import { Loader } from "../Loader/Loader";
import { ArrowLeft } from "../shared/ArrowLeft/ArrowLeft";
import { AboutBlock } from "./AboutBlock/AboutBlock";
import { EvolutionBlock } from "./EvolutionBlock/EvolutionBlock";
import "./PokemonCard.scss";
import { StatisticBlock } from "./StatisticBlock/StatisticBlock";

export type FilteredPokemonEvolutionChainType = {
  name: string;
  id: string;
  url: string;
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

type PokemonCardQueryType = {
  id?: string;
};

export type AboutPokemonInfoType = {
  baseHappiness: number | null;
  captureRate: number | null;
  color: string | null;
  flavorTextEntries:
    | { flavor_text: string; language: PokemonReusableType }[]
    | [];
  genus: string | null;
  habitat: string | null;
  shape: string | null;
};

type FlavorTextEntiesType = {
  flavor_text: string;
  language: PokemonReusableType;
  version: PokemonReusableType;
};

type PokemonEvolutionChainType = {
  name?: string | undefined;
  id?: string | undefined;
  url?: string | undefined;
};

export const PokemonCard: FC = (): JSX.Element => {
  const queryParams: PokemonCardQueryType = useParams();

  // TODO: fix types
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState<any>([]);
  const [pokemonEvolutionChainImages, setPokemonEvolutionChainImages] =
    useState<any>([]);
  const [pokemonDescriptionOption, setPokemonDescriptionOption] =
    useState<string>("stats");
  const [fetchEvolutionChainData, setFetchEvolutionChainData] =
    useState<PokemonFetchEvolutionChainType | null>(null);
  const [aboutPokemonInfo, setAboutPokemonInfo] =
    useState<AboutPokemonInfoType>({
      baseHappiness: null,
      captureRate: null,
      color: null,
      flavorTextEntries: [],
      genus: null,
      habitat: null,
      shape: null,
    });

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

  useEffect(() => {
    getPokemonEvolutionChainImages();
    // eslint-disable-next-line
  }, [pokemonEvolutionChain]);

  const filterPokemonEvolutionChain: FilteredPokemonEvolutionChainType[] =
    pokemonEvolutionChain.filter(
      (evolutionChain: PokemonEvolutionChainType) =>
        !isEmptyObject(evolutionChain)
    );

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

  const fetchPokemonEvolutionChain = async (url: string) => {
    try {
      const getSpeciesData = await axios.get(url);

      const {
        base_happiness,
        capture_rate,
        color: { name },
        flavor_text_entries,
        genera,
        habitat,
        shape,
      } = getSpeciesData.data;

      const filteredFlavorText = flavor_text_entries.filter(
        (entry: FlavorTextEntiesType) => entry.language.name === "en"
      );

      const aboutPokemonData = {
        baseHappiness: base_happiness,
        captureRate: capture_rate,
        color: name,
        flavorTextEntries: filteredFlavorText,
        genus: genera[7].genus,
        habitat: habitat && habitat.name,
        shape: shape && shape.name,
      };

      const speciesUrl: { url: string } = getSpeciesData.data.evolution_chain;
      const getEvolutionChain = await axios.get(speciesUrl.url);

      setFetchEvolutionChainData(getEvolutionChain.data.chain);
      setAboutPokemonInfo((aboutPokemonInfo) => ({
        ...aboutPokemonInfo,
        ...aboutPokemonData,
      }));
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const getUrlFromPokemonEvolutionChain = filterPokemonEvolutionChain.map(
    (pokemonOption: FilteredPokemonEvolutionChainType) => pokemonOption.url
  );

  const getPokemonEvolutionChainImages = async () => {
    if (!getUrlFromPokemonEvolutionChain[0]?.includes("undefined")) {
      const t = getUrlFromPokemonEvolutionChain.map(
        async (pokemonEvolutionChain: string) =>
          await axios.get(pokemonEvolutionChain)
      );

      Promise.all(t).then((res) => setPokemonEvolutionChainImages(res));
    }
  };

  return pokemon ? (
    <section className="pokemon-card">
      {/* Main Block */}
      <div className="pokemon-card__info">
        <h1 className="pokemon-card__info-id">
          {getPokemonNumber(pokemon.id)}
        </h1>
        <div className="pokemon-card__info-image">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        </div>
        <h1 className="pokemon-card__info-name">
          {modifyPokemonName(pokemon.name)}
        </h1>
      </div>

      <div className="pokemon-card__description">
        <div className="pokemon-card__panel-control">
          <button
            onClick={() => setPokemonDescriptionOption("stats")}
            className={`pokemon-card__panel-control-btn ${
              pokemonDescriptionOption === "stats" ? "active" : ""
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setPokemonDescriptionOption("about")}
            className={`pokemon-card__panel-control-btn ${
              pokemonDescriptionOption === "about" ? "active" : ""
            }`}
          >
            About
          </button>
          <button
            onClick={() => setPokemonDescriptionOption("evolution")}
            className={`pokemon-card__panel-control-btn ${
              pokemonDescriptionOption === "evolution" ? "active" : ""
            }`}
          >
            Evolution
          </button>
        </div>
        {pokemonDescriptionOption === "stats" && (
          <StatisticBlock pokemon={pokemon} />
        )}
        {pokemonDescriptionOption === "about" && (
          <AboutBlock aboutPokemonData={aboutPokemonInfo} />
        )}
        {pokemonDescriptionOption === "evolution" && (
          <EvolutionBlock
            filterPokemonEvolutionChain={filterPokemonEvolutionChain}
            pokemonEvolutionChainImages={pokemonEvolutionChainImages}
          />
        )}
      </div>
      <div className="pokemon-card__back">
        <ArrowLeft />
        <Link to="/" className="pokemon-card__back-link">
          Go back
        </Link>
      </div>
      <div className="pokemon-card__prev-next-btn">
        {pokemon.id !== 1 && (
          <Link to={`/${String(pokemon.id - 1)}`}>Prev pokemon</Link>
        )}
        <Link to={`/${String(pokemon.id + 1)}`}>Next pokemon</Link>
      </div>

      <h1>{error}</h1>
    </section>
  ) : (
    <Loader />
  );
};
