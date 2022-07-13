import { FC } from "react";
import { getPokemonNumber } from "../../services/helper";
import "./PokemonTile.scss";

// TODO: fix any

interface IPokemonTile {
  pokemon: any;
}

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export const PokemonTile: FC<IPokemonTile> = ({ pokemon }): JSX.Element => {
  const { name } = pokemon.types[0].type;
  return (
    <li className={`pokemon__list-pokemon ${name}`}>
      <h3 className="pokemon__list-pokemon-name">{pokemon.name}</h3>
      <p className="pokemon__list-pokemon-number">
        {getPokemonNumber(pokemon.id)}
      </p>
      <div className="pokemon__list-pokemon-image">
        <img
          src={pokemon.sprites.other.dream_world.front_default}
          alt={pokemon.name}
        />
      </div>
      <ul className="pokemon__list-pokemon-types">
        {pokemon.types.map((type: PokemonType, index: number) => {
          return (
            <li
              className="pokemon__list-pokemon-types-element"
              key={pokemon.name + index}
            >
              {type.type.name}
            </li>
          );
        })}
      </ul>
    </li>
  );
};
