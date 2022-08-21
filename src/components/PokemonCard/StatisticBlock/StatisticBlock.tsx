import { FC } from "react";
import { modifyPokemonName } from "../../../services/helper";
import { PokemonReusableType } from "../../../types/global";
import "./StatisticBlock.scss";

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

type IStatisticBlock = {
  pokemon: any;
};

export const StatisticBlock: FC<IStatisticBlock> = ({
  pokemon,
}): JSX.Element => {
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
  return (
    <div className="pokemon-card__info-stats">
      <h2 className="pokemon-card__info-stats-title">Main information</h2>
      <p className="pokemon-card__info-stats-item">
        Height: {getPokemonSize(pokemon.height, PokemonUnit.m)}
      </p>
      <p className="pokemon-card__info-stats-item">
        Weight: {getPokemonSize(pokemon.weight, PokemonUnit.kg)}
      </p>
      <ul>
        {pokemon.stats.map((stat: PokemonStatsType, index: number) => (
          <li key={index} className="pokemon-card__info-stats-item">
            <p>
              {modifyPokemonName(stat.stat.name)}: {stat.base_stat}
            </p>
            <progress id={stat.stat.name} max="100" value={stat.base_stat}>
              {stat.base_stat}
            </progress>
          </li>
        ))}
      </ul>
      <div className="pokemon-card__info-stats-types">
        <p className="pokemon-card__info-stats-types-title">Type:</p>
        <ul className="pokemon-card__info-stats-types-list">
          {pokemon.types.map((type: PokemonTypesType, index: number) => (
            <li
              key={index}
              className="pokemon-card__info-stats-types-list-item"
            >
              <img
                src={require(`../../../assets/pokemon-type/${type.type.name}.png`)}
                alt={type.type.name}
                className="pokemon-card__info-stats-types-list-image"
              />
              <p>{modifyPokemonName(type.type.name)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
