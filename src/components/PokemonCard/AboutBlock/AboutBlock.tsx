import { FC } from "react";
import { randomNumber } from "../../../services/helper";
import { AboutPokemonInfoType } from "../PokemonCard";
import "./AboutBlock.scss";

type IAboutBlock = {
  aboutPokemonData: AboutPokemonInfoType;
};

export const AboutBlock: FC<IAboutBlock> = ({
  aboutPokemonData,
}): JSX.Element => {
  return (
    <div className="pokemon-card__additional-info">
      <h2 className="pokemon-card__additional-info-title">
        Additional information
      </h2>
      <p className="pokemon-card__additional-info-item">
        Base happiness: {aboutPokemonData.baseHappiness}
      </p>
      <p className="pokemon-card__additional-info-item">
        Capture rate: {aboutPokemonData.captureRate}
      </p>
      <p className="pokemon-card__additional-info-item">
        Color: {aboutPokemonData.color}
      </p>
      <p className="pokemon-card__additional-info-item">
        Info:{" "}
        {aboutPokemonData.flavorTextEntries.length
          ? aboutPokemonData.flavorTextEntries[
              randomNumber(aboutPokemonData.flavorTextEntries.length)
            ].flavor_text
          : null}
      </p>
      <p className="pokemon-card__additional-info-item">
        Genus: {aboutPokemonData.genus}
      </p>
      {aboutPokemonData.habitat && (
        <p className="pokemon-card__additional-info-item">
          Habitat: {aboutPokemonData.habitat}
        </p>
      )}
      {aboutPokemonData.shape && (
        <p className="pokemon-card__additional-info-item">
          Shape: {aboutPokemonData.shape}
        </p>
      )}
    </div>
  );
};
