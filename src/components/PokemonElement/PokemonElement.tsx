import { FC } from "react";
import { getPokemonNumber } from "../../services/helper";
import "./PokemonElement.scss";

// TODO: fix any

interface IPokemonElement {
  pokemon: any;
}

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export const PokemonElement: FC<IPokemonElement> = ({
  pokemon,
}): JSX.Element => (
  <li className="pokemon__list-pokemon">
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
      {pokemon.types.map((type: PokemonType, index: number) => (
        <li
          className="pokemon__list-pokemon-types-element"
          key={pokemon.name + index}
        >
          {type.type.name}
        </li>
      ))}
    </ul>
  </li>
);
