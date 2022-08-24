import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "../../shared/ArrowLeft/ArrowLeft";
import { ArrowRight } from "../../shared/ArrowRight/ArrowRight";
import "./PokemonCardPagination.scss";

interface IPokemonCardPagination {
  paginationPageId: number;
}

export const PokemonCardPagination: FC<IPokemonCardPagination> = ({
  paginationPageId,
}): JSX.Element => (
  <div className="pokemon-card__pagination">
    <div className="pokemon-card__pagination-prev">
      <ArrowLeft />
      {paginationPageId !== 1 && (
        <Link to={`/${String(paginationPageId - 1)}`}>Prev pokemon</Link>
      )}
    </div>
    <div className="pokemon-card__pagination-next">
      <Link to={`/${String(paginationPageId + 1)}`}>Next pokemon</Link>
      <ArrowRight />
    </div>
  </div>
);
