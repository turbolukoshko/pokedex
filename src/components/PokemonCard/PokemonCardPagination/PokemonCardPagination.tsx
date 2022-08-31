import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { ArrowLeft } from "../../shared/ArrowLeft/ArrowLeft";
import { ArrowRight } from "../../shared/ArrowRight/ArrowRight";
import "./PokemonCardPagination.scss";

interface IPokemonCardPagination {
  paginationPageId: number;
}

export const PokemonCardPagination: FC<IPokemonCardPagination> = ({
  paginationPageId,
}): JSX.Element => {
  const { pokemon } = routes;
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  useEffect(() => {
    setDisabledButton(false);

    if (paginationPageId === 1) {
      setDisabledButton(true);
    }
  }, [paginationPageId]);

  return (
    <div className="pokemon-card__pagination">
      <div
        className={`pokemon-card__pagination-prev ${
          disabledButton ? "disabled" : ""
        }`}
      >
        <>
          <ArrowLeft />
          <Link
            to={`${pokemon}/${String(paginationPageId - 1)}`}
            onClick={(e: SyntheticEvent) =>
              disabledButton && e.preventDefault()
            }
          >
            Prev pokemon
          </Link>
        </>
      </div>
      {/* 
        It is not possible to count the last element for pagination with disabled button. 
        Since the count property from API is specified incorrectly 
        */}
      <div className="pokemon-card__pagination-next">
        <Link to={`${pokemon}/${String(paginationPageId + 1)}`}>
          Next pokemon
        </Link>
        <ArrowRight />
      </div>
    </div>
  );
};
