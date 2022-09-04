import { FC } from "react";
import { routes } from "../../routes";
import {
  getPokemonNumber,
  getPokemonType,
  modifyPokemonName,
} from "../../services/helper";
import "./PokemonTile.scss";

// TODO: fix any

interface IPokemonTile {
  pokemon: any;
  onClick: any;
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
}): JSX.Element => {
  const pokemonType = getPokemonType(pokemon);
  // TODO: NEED TO REFACTORING onClick FUNCTION
  return (
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
  );
};
