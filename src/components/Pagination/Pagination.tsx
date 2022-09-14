import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isLastPage } from "../../services/helper";
import { PokemonSelectorState } from "../../store/pokemon/types";
import { ArrowLeft } from "../shared/ArrowLeft/ArrowLeft";
import { ArrowRight } from "../shared/ArrowRight/ArrowRight";
import "./Pagination.scss";

/* 
  prevUrl, nextUrl - parameters for the Link component
  prev, next - functions to switch page
*/

interface IPagination {
  paginationPageId: number;
  prevUrl?: string;
  nextUrl?: string;
  prev?: () => void;
  next?: () => void;
}

export const Pagination: FC<IPagination> = ({
  paginationPageId,
  prevUrl,
  nextUrl,
  prev,
  next,
}): JSX.Element => {
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  useEffect(() => {
    setDisabledButton(false);

    if (paginationPageId === 1) {
      setDisabledButton(true);
    }
  }, [paginationPageId]);

  /* 
    count - received items from api
    limit - limit tiles per page
  */
  const pokemon = useSelector((state: PokemonSelectorState) => state.pokemon);
  const { count } = pokemon;
  const limit: number = 20;

  //TODO: need to fix isLastPage
  return (
    <div className="pagination">
      <div className={`pagination-prev ${disabledButton ? "disabled" : ""}`}>
        <>
          <ArrowLeft />
          {prevUrl ? (
            <Link
              to={prevUrl}
              onClick={(e: SyntheticEvent) =>
                disabledButton && e.preventDefault()
              }
            >
              Prev pokemon
            </Link>
          ) : (
            <button
              onClick={() => prev && prev()}
              disabled={paginationPageId === 1}
              className="pagination-prev__button"
            >
              Prev page
            </button>
          )}
        </>
      </div>
      {/* 
        It is not possible to count the last element for pagination with disabled button. 
        Since the count property from API is specified incorrectly 
        */}
      <div
        className={`pagination-next ${
          isLastPage(count, paginationPageId, limit) ? "disabled" : ""
        }`}
      >
        {nextUrl ? (
          <Link to={nextUrl}>Next pokemon</Link>
        ) : (
          <button
            onClick={() => next && next()}
            className="pagination-next__button"
            disabled={isLastPage(count, paginationPageId, limit)}
          >
            Next page
          </button>
        )}
        <ArrowRight />
      </div>
    </div>
  );
};
