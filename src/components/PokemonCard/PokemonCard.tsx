import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../api";
import {
 getPokemonIdFromUrl,
 getPokemonNumber,
 isEmptyObject,
 modifyPokemonName,
 randomNumber,
} from "../../services/helper";
import { PokemonReusableType } from "../../types/global";
import { Loader } from "../Loader/Loader";
import "./PokemonCard.scss";
 
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
 
type AdditionalPokemonInfoType = {
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
 const [additionalPokemonInfo, setAdditionalPokemonInfo] =
   useState<AdditionalPokemonInfoType>({
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
 
     const additionalPokemonData = {
       baseHappiness: base_happiness,
       captureRate: capture_rate,
       color: name,
       flavorTextEntries: filteredFlavorText,
       genus: genera[7].genus,
       habitat: habitat.name,
       shape: shape.name,
     };
 
     const speciesUrl: { url: string } = getSpeciesData.data.evolution_chain;
     const getEvolutionChain = await axios.get(speciesUrl.url);
 
     setFetchEvolutionChainData(getEvolutionChain.data.chain);
     setAdditionalPokemonInfo((additionalPokemonInfo) => ({
       ...additionalPokemonInfo,
       ...additionalPokemonData,
     }));
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
 
 useEffect(() => {
   getPokemonEvolutionChainImages();
   // eslint-disable-next-line
 }, [pokemonEvolutionChain]);
 
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
     <div className="pokemon-card__info" style={{ backgroundColor: "green" }}>
       <h1 className="pokemon-card__info-id">
         {getPokemonNumber(pokemon.id)}
       </h1>
       <div className="pokemon-card__info-image">
         <img
           src={pokemon.sprites.other["official-artwork"].front_default}
           alt={pokemon.name}
         />
         <h1 className="pokemon-card__info-name">
           {modifyPokemonName(pokemon.name)}
         </h1>
       </div>
     </div>
     {/* Stats block */}
     <div
       className="pokemon-card__info-stats"
       style={{ backgroundColor: "yellow" }}
     >
       <h1>Height: {getPokemonSize(pokemon.height, PokemonUnit.m)}</h1>
       <h1>Weight: {getPokemonSize(pokemon.weight, PokemonUnit.kg)}</h1>
       <ul>
         {pokemon.stats.map((stat: PokemonStatsType, index: number) => (
           <li key={index}>
             <p>
               {modifyPokemonName(stat.stat.name)}: {stat.base_stat}
             </p>
           </li>
         ))}
       </ul>
       <div className="pokemon-card__info-types">
         <ul>
           {pokemon.types.map((type: PokemonTypesType, index: number) => (
             <li key={index}>Type: {modifyPokemonName(type.type.name)}</li>
           ))}
         </ul>
       </div>
     </div>
     {/* Additional info block */}
     <div
       className="pokemon-card__additional-info"
       style={{ backgroundColor: "blue" }}
     >
       <p>Base happiness: {additionalPokemonInfo.baseHappiness}</p>
       <p>Capture rate: {additionalPokemonInfo.captureRate}</p>
       <p>Color: {additionalPokemonInfo.color}</p>
       <p>
         Info:
         <span>
           {additionalPokemonInfo.flavorTextEntries.length
             ? additionalPokemonInfo.flavorTextEntries[
                 randomNumber(additionalPokemonInfo.flavorTextEntries.length)
               ].flavor_text
             : null}
         </span>
       </p>
       <p>Genus: {additionalPokemonInfo.genus}</p>
       <p>Habitat: {additionalPokemonInfo.habitat}</p>
       <p>Shape: {additionalPokemonInfo.shape}</p>
     </div>
     {/* Evolution Block */}
     <div
       className="pokemon-card__evolution"
       style={{ backgroundColor: "pink" }}
     >
       Evolution chain:
       <ul>
         {filterPokemonEvolutionChain.map(
           (pokemon: FilteredPokemonEvolutionChainType, index: number) => (
             <li key={index}>
               <p>{pokemon.name}</p>
               <img
                 src={
                   pokemonEvolutionChainImages[index] &&
                   (pokemonEvolutionChainImages[index].data.sprites.other
                     .dream_world.front_default ||
                     pokemonEvolutionChainImages[index].data.sprites.other[
                       "official-artwork"
                     ].front_default)
                 }
                 alt="pokemon-evolution-chain"
               />
             </li>
           )
         )}
       </ul>
     </div>
     <h1>{error}</h1>
   </section>
 ) : (
   <Loader />
 );
};
