import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routes } from "../../routes";

import {
  getPokemonNumber,
  getPokemonType,
  modifyPokemonName,
  transformDataFromLocalStorage,
} from "../../services/helper";
import { getFavouritePokemonRegister } from "../../store/favouritePokemon/favouritePokemonAction";
import { SnackbarType } from "../PokemonList";
import { Like } from "../shared/Like/Like";
import "./PokemonTile.scss";

// TODO: fix any

interface IPokemonTile {
  pokemon: any;
  onClick: (routePath: string) => void;
  setActiveSnackbar: (value: SnackbarType[]) => void;
}

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export const PokemonTile: FC<IPokemonTile> = ({
  pokemon,
  onClick,
  setActiveSnackbar,
}): JSX.Element => {
  const dispatch = useDispatch();

  // State for active class
  const [favouritePokemonList, setFavouritePokemonList] = useState<string[]>(
    []
  );

  const getFavouritePokemonListFromLocalStorage = localStorage.getItem(
    "favouritePokemonList"
  );

  useEffect(() => {
    if (
      getFavouritePokemonListFromLocalStorage !== "" &&
      !!getFavouritePokemonListFromLocalStorage
    ) {
      const data = transformDataFromLocalStorage(
        getFavouritePokemonListFromLocalStorage
      );

      setFavouritePokemonList(data);
    } else {
      // default value for the localStorage
      localStorage.setItem("favouritePokemonList", "''");
    }
  }, [getFavouritePokemonListFromLocalStorage]);

  const pokemonType = getPokemonType(pokemon);

  // TODO: NEED TO REFACTORING onClick FUNCTION

  const addFavouritePokemon = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();

    if (
      localStorage.getItem("favouritePokemonList") === "" ||
      !localStorage.getItem("favouritePokemonList")
    ) {
      localStorage.setItem("favouritePokemonList", JSON.stringify(String(id)));
    } else {
      const getFavouritePokemonList = localStorage.getItem(
        "favouritePokemonList"
      );
      // Since the data received from the localStorage is a string, need to trim the firts and last characters ''
      const modifiedFavouritePokemonList = getFavouritePokemonList?.substring(
        1,
        getFavouritePokemonList.length - 1
      );

      // Add a new value to localStorage
      const updateFavouritePokemonList: string =
        modifiedFavouritePokemonList !== ""
          ? modifiedFavouritePokemonList + "," + String(id)
          : String(id);

      /* 
          Sort with unique value
          Convert a string value from localStorage to an array by delimiter 
          */
      const transformedStringToArray = modifiedFavouritePokemonList?.split(",");

      // Find index in existing array by pokemon id
      const index = transformedStringToArray?.indexOf(String(id));

      // If the value already exists in the array, remove it from the result array
      if (index !== undefined && index > -1) {
        transformedStringToArray?.splice(index, 1);
        const result = transformedStringToArray?.join();

        localStorage.setItem("favouritePokemonList", JSON.stringify(result));

        dispatch(getFavouritePokemonRegister(JSON.stringify(result)));
        setActiveSnackbar([
          {
            text: "Pokemon successfully removed from favorites",
            variant: "success",
            activeState: true,
          },
        ]);
        if (transformedStringToArray) {
          setFavouritePokemonList(transformedStringToArray);
        }
      } else {
        // User can't have more than 10 favorite Pokemon
        if (transformedStringToArray?.length === 10) {
          setActiveSnackbar([
            {
              text: "Can't have more than 10 favorite Pokemon",
              variant: "warning",
              activeState: true,
            },
          ]);

          return;
        }
        setActiveSnackbar([
          {
            text: "Pokemon successfully added to favorites",
            variant: "success",
            activeState: true,
          },
        ]);
        localStorage.setItem(
          "favouritePokemonList",

          JSON.stringify(updateFavouritePokemonList)
        );

        dispatch(
          getFavouritePokemonRegister(
            JSON.stringify(updateFavouritePokemonList)
          )
        );

        if (transformedStringToArray) {
          setFavouritePokemonList(transformedStringToArray);
        }
      }
    }
  };

  return (
    <>
      <li
        className={`pokemon__list-pokemon ${pokemonType}`}
        onClick={() => onClick(`${routes.pokemon}/${pokemon.id}`)}
      >
        <div className="pokemon__list-pokemon-info">
          <h3 className="pokemon__list-pokemon-info-name">
            {modifyPokemonName(pokemon.name)}
          </h3>
          <p className="pokemon__list-pokemon-info-number">
            {getPokemonNumber(pokemon.id)}
          </p>
          <button
            onClick={(e) => addFavouritePokemon(e, pokemon.id)}
            className={`pokemon__list-pokemon-info-like-button ${
              favouritePokemonList.includes(String(pokemon.id)) ? "active" : ""
            }`}
          >
            <Like />
          </button>
          <ul className="pokemon__list-pokemon-info-types">
            {pokemon.types.map((type: PokemonType, index: number) => {
              return (
                <li
                  className="pokemon__list-pokemon-info-types-element"
                  key={pokemon.name + index}
                >
                  {modifyPokemonName(type.type.name)}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pokemon__list-pokemon-image">
          <img
            src={
              pokemon.sprites.other.dream_world.front_default ||
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default ||
              pokemon.sprites.front_shiny ||
              pokemon.sprites.other.home.front_default ||
              require("../../assets/pokeball.png")
            }
            alt={pokemon.name}
          />
        </div>
      </li>
    </>
  );
};
