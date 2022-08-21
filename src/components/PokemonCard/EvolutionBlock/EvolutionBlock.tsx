import { FC } from "react";
import { Link } from "react-router-dom";
import { FilteredPokemonEvolutionChainType } from "../PokemonCard";
import "./EvolutionBlock.scss";

type IEvolutionBlock = {
  filterPokemonEvolutionChain: FilteredPokemonEvolutionChainType[];
  pokemonEvolutionChainImages: any;
};

export const EvolutionBlock: FC<IEvolutionBlock> = ({
  filterPokemonEvolutionChain,
  pokemonEvolutionChainImages,
}): JSX.Element => {
  return (
    <div className="pokemon-card__evolution">
      <h2 className="pokemon-card__evolution-title">Evolution chain</h2>
      <ul className="pokemon-card__evolution-list">
        {filterPokemonEvolutionChain.map(
          (pokemon: FilteredPokemonEvolutionChainType, index: number) => {
            return (
              <li key={index} className="pokemon-card__evolution-list-item">
                <Link to={`/${pokemon.id}`}>
                  <div className="pokemon-card__evolution-list-item-img">
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
                  </div>
                  <p className="pokemon-card__evolution-list-item-name">
                    {pokemon.name}
                  </p>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
